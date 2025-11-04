<template>
  <div class="p-4">
    <n-form ref="formRef" inline :model="formValue" :rules="rules">
      <n-form-item path="name" label="名称(你自己好记的名字)">
        <NInput v-model:value.trim="formValue.name" @keydown.enter.prevent />
      </n-form-item>
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
          添加
        </NButton>
      </n-form-item>
      <n-form-item>
        <NButton type="primary" :loading="isMutatePending" @click="handlePaste">
          粘贴
        </NButton>
      </n-form-item>
    </n-form>
    <p v-if="isLoading">Loading....</p>
    <div
      v-for="item in firmwares"
      v-else
      :key="item._id"
      class="mt-2 p-2 border border-gray-300 rounded flex justify-between items-center"
    >
      <div>
        Name: {{ item.name }} - File Name: {{ item.fileName }} - Md5:
        {{ item.md5 }} - Size: {{ item.size }}
      </div>
      <NButton
        text
        :loading="isRemoving"
        style="font-size: 24px"
        @click="removeFirmware({ id: item._id })"
      >
        <NIcon color="red"><DeleteFilled /></NIcon>
      </NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConvexMutation, useConvexQuery } from 'convex-vue'
import { api } from 'convex/_generated/api'
import { ref } from 'vue'
import type { FormInst } from 'naive-ui'
import { NForm, NInput, NButton, NFormItem, NIcon } from 'naive-ui'
import { DeleteFilled } from '@vicons/material'

const { mutate, isPending: isMutatePending } = useConvexMutation(
  api.pet.addFirmware
)

const { data: firmwares, isPending: isLoading } = useConvexQuery(
  api.pet.getFirmwares,
  {}
)

const { mutate: removeFirmware, isPending: isRemoving } = useConvexMutation(
  api.pet.removeFirmware
)

const formRef = ref<FormInst | null>(null)
const rules = {
  name: {
    required: true,
    message: 'Please input name',
    trigger: ['input']
  },
  fileName: {
    required: true,
    message: 'Please input file name',
    trigger: ['input']
  },
  md5: {
    required: true,
    message: 'Please input md5',
    trigger: 'blur'
  },
  size: {
    required: true,
    message: 'Please input size',
    trigger: ['input', 'blur']
  }
}
const formValue = ref({
  name: '',
  md5: '',
  size: '',
  fileName: ''
})

const handleAdd = async (e: MouseEvent) => {
  e.preventDefault()
  formRef?.value?.validate(async (errors) => {
    if (!errors) {
      await mutate({
        fileName: formValue.value.fileName,
        md5: formValue.value.md5,
        size: formValue.value.size,
        name: formValue.value.name
      })
      formValue.value.md5 = ''
      formValue.value.size = ''
      formValue.value.fileName = ''
      formValue.value.name = ''
    } else {
      console.log('error submit!!')
      return false
    }
  })
}

const handlePaste = async (e: MouseEvent) => {
  e.preventDefault()
  //read text from prompt
  const text = prompt('粘贴JSON格式的固件信息到此处:')
  if (!text) {
    return
  }

  //   {
  //                 "id": "1980150574224281601",
  //                 "name": "psj_net0.3.279.17851_en.zip",
  //                 "version": "0.3.279.17851",
  //                 "url": "https://material.pick-fun.com/upgrade/package/psj_net0.3.279.17851_en.zip",
  //                 "type": 3,
  //                 "size": "68927551",
  //                 "md5": "45f199e4034f80cf4c92932ef3a80c23",
  //                 "model": "AV000V0.3",
  //                 "status": 1,
  //                 "forceUpgrade": false,
  //                 "description": "fix bugs",
  //                 "createTime": "2025-10-20 13:54:21",
  //                 "updateTime": "2025-10-20 18:45:32",
  //                 "isPop": false
  //}

  const obj = JSON.parse(text)
  if (obj) {
    formValue.value.name = ''
    const lastSlashIndex = obj.url.lastIndexOf('/')

    // Extract the substring starting one position after the last slash
    const filename = obj.url.substring(lastSlashIndex + 1)
    formValue.value.fileName = filename
    formValue.value.md5 = obj.md5
    formValue.value.size = obj.size
  } else {
    alert('Clipboard content is not in the correct format.')
  }
}
</script>

<style scoped></style>
