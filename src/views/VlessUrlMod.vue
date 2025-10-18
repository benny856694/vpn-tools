<template>
  <div class="p-2 text-left">
    <NH2 align-text>
      <NText type="info">
        This tool looks up the geolocation of the vless server, and append the
        geolocation to the name of the server
      </NText>
    </NH2>
    <div class="flex flex-row gap-x-2 m-2 items-center text-left">
      <NFlex class="flex-1" justify="end">
        <NButtonGroup size="small">
          <n-button
            type="error"
            :disabled="orgUrls?.length == 0"
            @click="orgUrls = ''"
          >
            <template #icon>
              <n-icon><close-round /></n-icon>
            </template>
            Clear
          </n-button>
        </NButtonGroup>
        <NInput
          v-model:value="orgUrls"
          type="textarea"
          placeholder="original vless urls, can contain multiple urls. each url starts with vless://"
          rows="30"
          >original url</NInput
        >
      </NFlex>
      <NButton
        :disabled="loading || orgUrls?.length == 0"
        :loading="loading"
        @click="convert"
        >Convert</NButton
      >
      <NFlex class="flex-1" justify="end">
        <NButtonGroup size="small">
          <n-button
            type="error"
            :disabled="modUrls?.length == 0"
            @click="modUrls = ''"
          >
            <template #icon>
              <n-icon><CloseRound /></n-icon>
            </template>
            Clear
          </n-button>
          <n-button :disabled="modUrls?.length == 0" @click="copyToClipboard">
            <template #icon>
              <n-icon><ContentCopyRound /></n-icon>
            </template>
            Copy
          </n-button>
        </NButtonGroup>
        <NInput
          v-model:value="modUrls"
          type="textarea"
          placeholder="modified url"
          rows="30"
          >modified url</NInput
        >
      </NFlex>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NInput,
  NButton,
  NH2,
  NText,
  NFlex,
  useMessage,
  NButtonGroup
} from 'naive-ui'
import { CloseRound, ContentCopyRound } from '@vicons/material'
import { appendGeolocationToVlessNames } from '@/utils/utils'
const message = useMessage()
const orgUrls = ref<string>('')
const modUrls = ref<string>('')
const loading = ref<boolean>(false)
async function convert() {
  loading.value = true
  try {
    const result = await appendGeolocationToVlessNames(orgUrls.value)
    modUrls.value = result
  } finally {
    loading.value = false
  }
}
function copyToClipboard() {
  navigator.clipboard.writeText(modUrls.value)
  message.success('Copied to clipboard')
}
</script>

<style lang=""></style>
