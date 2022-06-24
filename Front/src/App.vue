<script>
  import "../public/custom.css"
  import LoginVue from './components/Login.vue'
  import Navbar from './components/Navbar.vue'

  export default {
    name: "App",
    components: {
      LoginVue,
      Navbar
    }
  }
</script>

<template>
  <navbar />
  <router-view></router-view>
</template>

<style>
</style>
