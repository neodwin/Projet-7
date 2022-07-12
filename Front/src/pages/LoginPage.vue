<script>
    import { url, headers } from "../../services/fetchOption.js"
    import "../../public/custom.css"

    export default {
        name: "LoginPage",
        data() {
        return { 
          email: "edwin@edwin.fr", 
          password: "MayTheForce",
          confirmPassword: "MayTheForce",
          invalidIdentifiers: false, 
          error: null, 
          isLoginMode: true
         }
       },
        methods: {
          checkIdentifiers,
          validateForm,
          switchLoginMode() {
            this.isLoginMode = !this.isLoginMode
          },
          signUp: async function(){
            console.log("sign up")
            const options = {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({ email: this.email, password: this.password, confirmPassword: this.confirmPassword })
            }
            try {
            const res = await fetch(url + "auth/signup")
                if (res.status === 200) return res.json()
                  console.log("error:", res)
                  } catch(err) {
                    console.log("err:", err)
                    throw new Error("Echec à la création du compte")
                    this.$router.push("/login")
                  }
            }
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
    function validateForm(bool) {
      console.log("validateForm:", bool)
      this.invalidIdentifiers = !bool
    }
    function checkIdentifiers(email, password, router) {
        console.log({ email, password })
        
        const options = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        }
        fetch(url + "auth/login", options)
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
    
</script>

<template>
  <main class="form-signin w-100 m-auto">
    <form :class="this.invalidIdentifiers ? 'hasErrors' : ''">
        <h1 class="h3 mb-3 fw-normal">{{ this.isLoginMode ? "Veuillez vous identifier" : "Veuillez vous inscrire" }}</h1>
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
      <div v-if="!isLoginMode" class="form-floating">
        <input 
          type="password" 
          class="form-control"  
          placeholder="Confirm password" 
          v-model="confirmPassword" 
          required="required"
          @invalid="invalidForm"
        />
        <label for="floatingPassword">Confirmez votre Mot de passe</label>
      </div>
      <div v-if="invalidIdentifiers" class="error-msg">Les champs ne peuvent pas être vides</div>
      <div v-if="!invalidIdentifiers && error" class="error-msg">{{ error }}</div>
      
      <button 
        v-if="isLoginMode"
        class="w-100 btn btn-lg btn-success" 
        type="submit" @click.prevent="checkIdentifiers(this.email, this.password, this.$router)"
        :disabled="invalidIdentifiers"
      >
        Se connecter
      </button>

      <button 
        v-if="!isLoginMode"
        class="w-100 btn btn-lg btn-success" 
        type="submit" 
        @click.prevent="signUp"
        :disabled="invalidIdentifiers"
      >
        Inscrivez-vous
      </button>
      <p class="mt-1 mb-1" @click.prevent="switchLoginMode">
        <a href="#" class="link-primary">{{ this.isLoginMode ? "Créez un compte" : "Retour aux champs de connexion" }}</a>
      </p>
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
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

button[type=submit] {
  margin-block: 15px;
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