import { createApp } from 'vue'
import BootstrapVue3 from 'bootstrap-vue-3'
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue'
import Login from "./components/Login.vue"
import Wall from "./components/Wall.vue"

import '../public/custom.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-3/dist/bootstrap-vue-3.css'

const routes = [
    { path: "/", component: Login },
    { path: "/home", component: Wall }
]
const router = createRouter({ history: createWebHistory(), routes })

const app = createApp(App)
app.use(BootstrapVue3)
app.use(router)
app.mount('#app')