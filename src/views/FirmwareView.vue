<template>
  <div class="p-4">
    <NForm ref="formRef">
      <NFormItem path="age" label="Age">
        <NInput @keydown.enter.prevent />
      </NFormItem>
      <NFormItem path="password" label="Password">
        <NInput type="password" @keydown.enter.prevent />
      </NFormItem>
      <NFormItem
        ref="rPasswordFormItemRef"
        first
        path="reenteredPassword"
        label="Re-enter Password"
      >
        <NInput type="password" @keydown.enter.prevent />
      </NFormItem>
      <NRow :gutter="[0, 24]">
        <NCol :span="24">
          <div style="display: flex; justify-content: flex-end">
            <NButton type="primary" @click="add"> Add </NButton>
          </div>
        </NCol>
      </NRow>
    </NForm>
    <div class="mt-8">
      <div v-if="isPending">Loading...</div>
      <div v-else>
        <div v-for="fw in data" :key="fw._id" class="mb-2 p-2 border rounded">
          <div>Path: {{ fw.path }}</div>
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
import { NForm, NInput, NButton, NFormItem, NRow, NCol } from 'naive-ui'

const { data, isPending } = useConvexQuery(api.pet.getFirmwares)
const addFirmware = useConvexMutation(api.pet.addFirmware)

const add = async (data: any) => {
  await addFirmware.mutate({
    path: 'some path',
    md5: 'some md5',
    size: '12345'
  })
}
</script>

<style lang=""></style>
