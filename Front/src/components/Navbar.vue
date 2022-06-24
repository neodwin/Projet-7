<script>
    import "../../public/custom.css"
    import Logo from "./Logo.vue"
    export default {
        name: "Navbar",
        components: { Logo }
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
            <router-link to="/home" class="nav-link px-2 text-success">Home</router-link></li>
        </ul>

        <div class="text-end">
          <button type="button" class="btn btn-outline-success me-2">Connexion</button>
          <button type="button" class="btn join btn-secondary">Rejoignez-nous</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: #FD2D01 !important;
}
.nav-link {
  color: #4E5166 !important;
}
.btn-outline-success {
  background-color: #FFD7D7 !important;
}
</style>