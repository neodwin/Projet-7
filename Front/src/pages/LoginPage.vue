<script>
    import "../../public/custom.css"

      function checkIdentifiers(email, password, router) {
        console.log({ email, password })
        const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
        const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/auth/login`
        
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
        fetch(url, options)
          .then((res) => { 
            if (res.ok) return res.json()
            res.text().then((err) => {
            const { error } = JSON.parse(err)
            this.error = error
            throw new Error(error)
            })
          })
          .then(res => {
           const token = res.token
           localStorage.setItem("token", token)
           router.go("/home")
          })
          .catch((err) => {
            console.error(err)
          })
      }

    export default {
        name: "LoginPage",
        data,
        methods: {
          checkIdentifiers,
          validateForm
        },
        watch: {
          email(value) {
            const valueDevoid = value === ""
            this.validateForm(!valueDevoid)
            this.error = null 
          },
          password(value) {
            const valueDevoid = value === ""
            this.validateForm(!valueDevoid)
            this.error = null 
          }
        }
      }
    function data() {
      return { email: "edwin@edwin.fr", password: "MayTheForce", invalidIdentifiers: false, error: null }
    }

    function validateForm(bool) {
      console.log("validateForm:", bool)
      this.invalidIdentifiers = !bool
    }
    
</script>

<template>
  <main class="form-signin w-100 m-auto">
    <form :class="this.invalidIdentifiers ? 'hasErrors' : ''">
        <h1 class="h3 mb-3 fw-normal">Veuillez vous identifier</h1>
      <div class="form-floating">
        <input 
          type="email" 
          class="form-control" 
          id="floatingInput" 
          placeholder="name@example.com" 
          v-model="email" 
          required="required"
          @invalid="invalidForm"
        />
        <label for="floatingInput">Adresse e-mail</label>
      </div>
      <div class="form-floating">
        <input 
          type="password" 
          class="form-control" 
          id="floatingPassword" 
          placeholder="Password" 
          v-model="password" 
          required="required"
          @invalid="invalidForm"
        />
        <label for="floatingPassword">Mot de passe</label>
      </div>
      <div v-if="invalidIdentifiers" class="error-msg">Les champs ne peuvent pas être vides</div>
      <div v-if="!invalidIdentifiers && error" class="error-msg">{{ error }}</div>
      
      <button 
        class="w-100 btn btn-lg btn-success" 
        type="submit" @click.prevent="checkIdentifiers(this.email, this.password, this.$router)"
        :disabled="invalidIdentifiers"
      >
        Se connecter
      </button>

      <p class="mt-5 mb-3 text-muted">Value: {{ email }}</p>
      <p class="mt-5 mb-3 text-muted">Value: {{ password }}</p>
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

.hasErrors input {
  border: 1px solid red;
  position: relative;
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