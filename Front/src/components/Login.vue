<script>
    import "../../public/custom.css"
    export default {
        name: "Login"
    }
</script>

<template>
  <main class="form-signin w-100 m-auto">
    <form>
      <img class="mb-4 d-block mx-auto" src="../assets/icon-left-font.png" alt="" width="92" height="37">
        <h1 class="h3 mb-3 fw-normal">Veuillez vous identifier</h1>
      <div class="form-floating">
        <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
        <label for="floatingInput">Adresse e-mail</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <button class="w-100 btn btn-lg btn-success" type="submit">Se connecter</button>
    </form>
  </main>
</template>

<style scoped>
    html,
body {
  font-family: 'Lato', sans-serif;
}

body {
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
}
.img {
  width: 100%;
}
.form-signin {
  max-width: 330px;
  padding: 15px;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

  .bd-placeholder-img {
        font-size: 1.125rem;
        text-anchor: middle;
        -webkit-user-select: none;
        -moz-user-select: none;
        user-select: none;
      }

      @media (min-width: 768px) {
        .bd-placeholder-img-lg {
          font-size: 3.5rem;
        }
      }
</style>