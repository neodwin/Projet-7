<script>
import Card from "./post/Card.vue"
import PostForm from "./post/PostForm.vue"
import { getFetchOptions } from "../../services/fetchOption.js"
export default {
    name: "WallPage",
    components: {
        Card,
        PostForm
    },
        data() {
            return {
                posts: [],
                currentUser: null,
                role: this.isAdmin(),
            }
        },
    beforeCreate() {
        const token = localStorage.getItem("token")
        if (token == null) {
            this.$router.push("/login")
        }
    },
    methods: {
        isAdmin() {
            const userLogged = localStorage.getItem("role")
                    if (userLogged === "ADMIN") {
                        console.log("L'administrateur est connecté")
                        return userLogged
                    }
                },
            },
    mounted() {
        const { url, headers } = getFetchOptions()
        const options = {
            headers: { ...headers }
        }
        fetch(url +"posts/", options)
            .then((res) => {
                if (res.status === 200) {
                    return res.json()
                } else {
                    throw new Error("Échec de la récupération des posts")
                }
            })
            .then((res) => {
                console.log("res:", res)
                const { posts, email } = res
                this.posts = posts
                this.currentUser = email

                const roleAdmin = res.userLogged.role
                console.log("roleAdmin:", roleAdmin)
                localStorage.setItem("role", res.role)
            })
            .catch((err) => console.log("err:", err))
    }
}
</script>

<template>
    <div v-if="currentUser" class="container-sm">
        <div class="col-sm-12">
            <div v-if="this.role === 'ADMIN'" class="text-center" id="welcomeMessage">Bonjour {{ currentUser }} <br /> Vous êtes connecté en tant que {{ role }} 
            </div>
            <div v-else="this.role === 'USER'" class="mb-4" id="welcomeMessage"> Bonjour {{ currentUser }} 
            </div>
        </div>
        <PostForm></PostForm>
        <div v-if="posts.length === 0">Pas de posts sur le mur. Commencez à poster !</div>
        <div v-for="post in posts">
            <Card 
                :currentUser="currentUser"
                :userId="post.userId"
                :email="post.user.email"
                :content="post.content" 
                :url="post.imageUrl" 
                :comments="post.comments"
                :id="post.id"
                > 
            </Card>
        </div>
    </div>
</template>

<style scoped>
#welcomeMessage {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-block: 0.5em;
}
</style>