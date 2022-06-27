import LoginPage from "../pages/LoginPage.vue"
import SignUpPage from "../pages/SignUpPage.vue"
import WallPage from "../pages/WallPage.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: "/", component: LoginPage },
    { path: "/signup", component: SignUpPage },
    { path: "/home", component: WallPage }
]
const router = createRouter({ history: createWebHistory(), routes })

export { router }