<template>
  <n-config-provider
    data-cy="app"
    :theme="theme"
    :class="{ dark: mode }"
    :theme-overrides="appTheme(darkMode)"
  >
    <NMessageProvider>
      <n-layout position="absolute">
        <n-layout-header
          style="height: 64px; padding: 0 24px 24px 24px"
          bordered
        >
          <div class="flex flex-row justify-between items-center">
            <h2>VPN Tools</h2>
            <n-switch v-model:value="mode" data-cy="dark-mode">
              <template #checked> Dark </template>
              <template #unchecked> Light </template>
              <template #checked-icon>
                <n-icon>
                  <moon />
                </n-icon>
              </template>
              <template #unchecked-icon>
                <n-icon>
                  <sun />
                </n-icon>
              </template>
            </n-switch>
          </div>
        </n-layout-header>
        <n-layout
          class="bg-white dark:bg-gray-800 dark:text-white text-gray-800 text-center h-screen w-screen"
          has-sider
          position="absolute"
          style="top: 64px; bottom: 64px"
        >
          <n-layout-sider
            data-cy="sidebar"
            class="fixed h-full"
            collapse-mode="transform"
            :width="240"
            :native-scrollbar="false"
            bordered
            show-trigger="arrow-circle"
          >
            <div class="text-left m-4">
              <h3><RouterLink to="/">Home</RouterLink></h3>
              <h3><RouterLink to="/vlessmod">Vless Mod</RouterLink></h3>
            </div>
          </n-layout-sider>
          <n-layout-content :native-scrollbar="false">
            <router-view class="m-2" />
          </n-layout-content>
        </n-layout>
      </n-layout>
    </NMessageProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { darkTheme, lightTheme, NMessageProvider, NH1 } from 'naive-ui'
import { computed, ref, watchEffect } from 'vue'
import { appTheme } from '@/lib'

const darkStore = localStorage.getItem('dark')
const prefersDark: boolean = darkStore
  ? darkStore === 'true'
  : window.matchMedia('(prefers-color-scheme: dark)').matches

const mode = ref<boolean>(prefersDark)
const darkMode = computed(() => mode.value)

const theme = computed(() => (mode.value ? darkTheme : lightTheme))

watchEffect(() => {
  localStorage.setItem('dark', `${mode.value}`)
})

const collapsed = ref(true)
</script>

<style lang="sass">
#app
  font-family: Inter, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
</style>
