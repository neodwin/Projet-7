<script>
    import Logo from "../ui/Logo.vue"
    export default {
        name: "AppNavbar",
        components: { Logo },
        data() {
          return {
            isLoggedIn: false
          }
        },
        created() {
          const token = localStorage.getItem("token")
          if (token != null) {
            this.isLoggedIn = true
          }
        },
        methods: {
          logout() {
            localStorage.removeItem("token")
            this.$router.push("/login")
          }
        }
    }
</script>

<template>
<header class="p-3 bg-primary text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <Logo class="bi me-2" width="180" height="32" role="img" aria-label="Bootstrap"></Logo>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li>
            <router-link to="/home" v-if="isLoggedIn" class="nav-link px-2 text-success">Home</router-link>
          </li>
        </ul>

        <div class="text-end">
          <button @click="$router.push('')" v-if="!this.isLoggedIn" type="button" class="btn btn-outline-success me-2">Connexion</button>
          <button @click="logout" v-if="this.isLoggedIn" type="button" class="btn btn-outline-dark ms-2">Déconnexion</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #FFD7D7 !important;
}
.btn-outline-success {
  color: #4E5166;
  background-color: #FD2D01 !important;
}
</style>