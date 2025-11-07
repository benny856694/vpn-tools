import { createApp } from 'vue'
import App from '@/App.vue'
import '@/styles/index.sass'
import router from '@/router'
import { createPinia } from 'pinia'
import { globalComponents } from '@/components'
import { convexVue } from 'convex-vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const app = createApp(App)
app.use(router)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
app.use(globalComponents)
app.use(convexVue, { url: import.meta.env.VITE_CONVEX_URL })

app.mount('#app')
