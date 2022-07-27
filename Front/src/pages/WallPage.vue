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
    beforeCreate() {
        const token = localStorage.getItem("token")
        if (token == null) {
            this.$router.push("/login")
        }
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
                const { posts, email } = res
                this.posts = posts
                this.currentUser = email
            })
            .catch((err) => console.log("err:", err))
    },
    data() {
        return {
            posts: [],
            currentUser: null
        }
    }
}
</script>

<template>
    <div v-if="currentUser" class="container-sm">
        <div class="col-sm-12">
            <h1 class="text-center">Bienvenue {{ currentUser }}</h1>
        </div>
        <PostForm></PostForm>
        <div v-if="posts.length === 0">Pas de posts sur le mur. Commencez à poster !</div>
        <div v-for="post in posts">
            <Card 
                :currentUser="currentUser"
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
h1 {
    font-size: 20px;
    font-weight: bold;
    color: #333;
    margin-block: 0.5em;
}
</style>