import LoginPage from "../pages/LoginPage.vue"
import WallPage from "../pages/WallPage.vue"
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    { path: "/login", component: LoginPage },
    { path: "/signup", component: LoginPage },
    { path: "/home", component: WallPage }
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