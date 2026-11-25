import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

const app = createApp(App)

// 1. Cria a instância do Pinia
const pinia = createPinia()

// 2. Usa o plugin na instância criada
pinia.use(piniaPluginPersistedstate)

// 3. Usa a instância configurada na aplicação Vue
app.use(pinia)

app.use(router)
app.use(vuetify)

app.mount('#app')
