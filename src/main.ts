import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { BootstrapVue } from 'bootstrap-vue'
import App from './App.vue'
import router from './router'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.use(BootstrapVue)

app.mount('#app')
