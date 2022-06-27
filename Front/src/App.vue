<script>
  import "../public/custom.css"
  import LoginPage from './pages/LoginPage.vue'
  import SignUpPage from "./pages/SignUpPage.vue"
  import AppNavbar from './components/layout/AppNavbar.vue'

  export default {
    name: "App",
    components: {
      LoginPage,
      SignUpPage,
      AppNavbar
    }
  }
</script>

<template>
  <AppNavbar />
  <router-view></router-view>
</template>

<style>
</style>
