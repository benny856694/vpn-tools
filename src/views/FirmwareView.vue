<template>
  <div class="p-4">
    <n-form
      v-show="false"
      ref="formRef"
      inline
      :model="formValue"
      :rules="rules"
    >
      <!-- <n-form-item path="age" label="Name">
        <NInput readonly @keydown.enter.prevent />
      </n-form-item> -->
      <NFormItem path="md5" label="Md5">
        <NInput v-model:value.trim="formValue.md5" @keydown.enter.prevent />
      </NFormItem>
      <NFormItem path="size" label="Size">
        <NInput v-model:value.trim="formValue.size" @keydown.enter.prevent />
      </NFormItem>
      <NFormItem
        ref="rPasswordFormItemRef"
        first
        path="fileName"
        label="File Name"
      >
        <NInput
          v-model:value.trim="formValue.fileName"
          width="160"
          @keydown.enter.prevent
        />
      </NFormItem>
      <n-form-item>
        <NButton type="primary" :loading="isMutatePending" @click="handleAdd">
          Add
        </NButton>
      </n-form-item>
    </n-form>
    <div class="mt-2">
      <div v-if="isTargetFirmwarePending || isSourcesPending">Loading...</div>
      <n-form v-else inline :label-width="180">
        <NFormItem path="md5" label="SN">
          <NInput v-model:value.trim="sn" placeholder="输入序列号" />
        </NFormItem>
        <NFormItem path="md5" label="当前版本">
          <NSelect
            v-model:value="deviceCurVer"
            :options="curVerOptions"
            style="min-width: 180px"
            placeholder="选择版本"
          />
        </NFormItem>
        <NFormItem path="size" label="目标固件版本">
          <NSelect
            v-model:value="targetFirmwareId"
            :options="targetFirmwareOptions"
            style="min-width: 180px"
            placeholder="选择目标固件版本"
          />
        </NFormItem>
        <NFormItem
          ref="rPasswordFormItemRef"
          first
          path="Source"
          label="固件存储来源"
        >
          <NSelect
            v-model:value="sourceId"
            :options="sourceOptions"
            style="min-width: 180px"
            placeholder="选择固件存储来源"
          />
        </NFormItem>
        <n-form-item>
          <NButton type="primary" :disabled="!url" @click="handleUpdate">
            推送升级包
          </NButton>
        </n-form-item>
        <n-form-item>
          <NButton :disabled="!firmwareUrl" @click="testDownload">
            <template #icon>
              <NIcon>
                <OpenInNewFilled />
              </NIcon>
            </template>
            测试固件下载
          </NButton>
        </n-form-item>
      </n-form>
      <p>{{ url }}</p>
      <NInput
        v-model:value="updateResult"
        type="textarea"
        placeholder="推送结果"
        readonly
        :autosize="{ minRows: 5 }"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConvexQuery, useConvexMutation } from 'convex-vue'
import { api } from '../../convex/_generated/api'
import { Doc, Id } from '../../convex/_generated/dataModel'
import { NForm, NInput, NButton, NFormItem, NSelect } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { computed, ref, watch } from 'vue'
import { OpenInNewFilled } from '@vicons/material'

enum DeviceCurrentVersion {
  China,
  Global
}

const { data: targetFirmwares, isPending: isTargetFirmwarePending } =
  useConvexQuery(api.pet.getFirmwares, {})
const { data: sources, isPending: isSourcesPending } = useConvexQuery(
  api.pet.getSources,
  {}
)
const { mutate, isPending: isMutatePending } = useConvexMutation(
  api.pet.addFirmware
)

const formRef = ref<FormInst | null>(null)
const rules = {
  md5: {
    required: true,
    message: 'Please input md5',
    trigger: 'blur'
  },
  size: {
    required: true,
    message: 'Please input size',
    trigger: ['input', 'blur']
  },

  fileName: {
    required: true,
    message: 'Please input url',
    trigger: ['input']
  }
}
const formValue = ref({
  name: '',
  md5: '',
  size: '',
  fileName: ''
})

const deviceCurVer = ref<DeviceCurrentVersion>(DeviceCurrentVersion.China)
const sourceId = ref<Id<'sources'> | null>(null)
const targetFirmwareId = ref<Id<'firmwares'> | null>(null)
const sn = ref('')
const updateResult = ref<string>('')

const curVerOptions = [
  { label: '中国大陆', value: DeviceCurrentVersion.China },
  { label: '海外版', value: DeviceCurrentVersion.Global }
]

const sourceOptions = computed(() => {
  return sources.value
    ? sources.value.map((src: Doc<'sources'>) => ({
        label: src.name,
        value: src._id
      }))
    : []
})

const targetFirmwareOptions = computed(() => {
  return targetFirmwares.value
    ? targetFirmwares.value.map((fw: Doc<'firmwares'>) => ({
        label: fw.name ?? fw.fileName,
        value: fw._id
      }))
    : []
})

const url = computed(() => {
  if (!targetFirmwareId.value) {
    return ''
  }
  if (!sourceId.value) {
    return ''
  }
  if (!sn.value) {
    return ''
  }
  const targetFirmware = targetFirmwares.value?.find(
    (fw: Doc<'firmwares'>) => fw._id === targetFirmwareId.value
  )
  const source = sources.value?.find(
    (src: Doc<'sources'>) => src._id === sourceId.value
  )

  if (!targetFirmware) {
    return ''
  }
  if (!source) {
    return ''
  }

  if (deviceCurVer.value === DeviceCurrentVersion.China) {
    return `https://gw.pick-fun.com.cn/device/test/mqtt/upgrade?md5=${targetFirmware.md5}&size=${targetFirmware.size}&url=${encodeURIComponent(source.baseUrl + targetFirmware.fileName)}&sn=${sn.value}&test-verify=1111`
  } else {
    return `https://gw.pick-fun.com/device/test/mqtt/upgrade?md5=${targetFirmware.md5}&size=${targetFirmware.size}&url=${encodeURIComponent(source.baseUrl + targetFirmware.fileName)}&sn=${sn.value}&test-verify=1111`
  }
})

const firmwareUrl = computed(() => {
  if (!targetFirmwareId.value) {
    return ''
  }
  if (!sourceId.value) {
    return ''
  }
  const targetFirmware = targetFirmwares.value?.find(
    (fw: Doc<'firmwares'>) => fw._id === targetFirmwareId.value
  )
  const source = sources.value?.find(
    (src: Doc<'sources'>) => src._id === sourceId.value
  )

  if (!targetFirmware) {
    return ''
  }
  if (!source) {
    return ''
  }

  return `${source.baseUrl}${targetFirmware.fileName}`
})

watch(targetFirmwares, () => {
  targetFirmwareId.value = null
})

const handleUpdate = async (e: MouseEvent) => {
  e.preventDefault()
  try {
    updateResult.value = '升级中...'
    //change the fetch header: accept-language to en-US,en;q=0.9
    const resp = await fetch(url.value, {
      headers: {
        'Accept-Language': 'zh-CN'
      }
    })
    const text = await resp.json()
    updateResult.value = JSON.stringify(text, null, 2)
  } catch (err) {
    updateResult.value = `Error: ${err}`
  }
}

const testDownload = async (e: MouseEvent) => {
  e.preventDefault()

  try {
    const newWin = window.open(
      firmwareUrl.value,
      '_blank',
      'noopener,noreferrer'
    )
    if (newWin) {
      newWin.focus?.()
      updateResult.value = 'Opened firmware URL in a new window'
      return
    }
    // Fallback for strict popup blockers: create an anchor and click it
    const a = document.createElement('a')
    a.href = firmwareUrl.value
    a.target = '_blank'
    a.rel = 'noopener noreferrer'
    document.body.appendChild(a)
    a.click()
    a.remove()
  } catch (err) {
    updateResult.value = `Error: ${err}`
  }
}

const handleAdd = async (e: MouseEvent) => {
  e.preventDefault()
  formRef?.value?.validate(async (errors) => {
    if (!errors) {
      await mutate({
        fileName: formValue.value.fileName,
        md5: formValue.value.md5,
        size: formValue.value.size
      })
      formValue.value.md5 = ''
      formValue.value.size = ''
      formValue.value.fileName = ''
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
</script>

<style lang=""></style>
