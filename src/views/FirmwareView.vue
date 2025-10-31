<template>
  <div class="p-4">
    <n-form ref="formRef" inline :model="formValue" :rules="rules">
      <!-- <n-form-item path="age" label="Name">
        <NInput readonly @keydown.enter.prevent />
      </n-form-item> -->
      <NFormItem path="md5" label="Md5">
        <NInput v-model:value.trim="formValue.md5" @keydown.enter.prevent />
      </NFormItem>
      <NFormItem path="size" label="Size">
        <NInput v-model:value.trim="formValue.size" @keydown.enter.prevent />
      </NFormItem>
      <NFormItem ref="rPasswordFormItemRef" first path="fileName" label="File Name">
        <NInput v-model:value.trim="formValue.fileName" width="160" @keydown.enter.prevent />
      </NFormItem>
      <n-form-item>
        <NButton type="primary" :loading="isMutatePending" @click="handleAdd"> Add </NButton>
      </n-form-item>
    </n-form>
    <div class="mt-2">
      <div v-if="isPending">Loading...</div>
      <div v-else>
        <div v-for="fw in data" :key="fw._id" class="mb-2 p-2 border rounded">
          <div>File Name: {{ fw.fileName }}</div>
          <div>MD5: {{ fw.md5 }}</div>
          <div>Size: {{ fw.size }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useConvexQuery, useConvexMutation } from 'convex-vue'
import { api } from '../../convex/_generated/api'
import { NForm, NInput, NButton, NFormItem } from 'naive-ui'
import type { FormInst } from 'naive-ui'
import { ref } from 'vue'

const { data, isPending } = useConvexQuery(api.pet.getFirmwares, {})
const { mutate, isPending: isMutatePending } = useConvexMutation(api.pet.addFirmware)

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
