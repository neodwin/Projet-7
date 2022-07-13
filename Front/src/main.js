import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import { router } from './routes/router'

import App from './App.vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'
import 'bootstrap-icons/font/bootstrap-icons'

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.mount('#app')