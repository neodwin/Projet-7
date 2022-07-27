import LoginPage from "../pages/LoginPage.vue"
import WallPage from "../pages/WallPage.vue"
import Card from "../pages/post/Card.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { name: "login", path: "/login", component: LoginPage },
    { name: "signup", path: "/signup", component: LoginPage },
    { name: "home", path: "/home", component: WallPage },
    { name: "like", path: "/home", component: Card },
    { path: "/", redirect: "/home" }
]
const router = createRouter({ history: createWebHistory(), routes })

router.beforeEach((to, from) => {
    if (loginRequired(to)) {
        return router.push("/login")
    }
})

function loginRequired(to) {
    if (!privatePage(to)) return false
    if (!tokenInCache()) return true
    return false
}

function privatePage(to) {
    const publicPages = ["/login", "/signup"]
    return !publicPages.includes(to.path)
}

function tokenInCache() {
    return localStorage.getItem("token") != null
}

export { router }