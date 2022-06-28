<script>
  import "../public/custom.css"
  import AppNavbar from './components/layout/AppNavbar.vue'

  export default {
    name: "App",
    components: {
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
