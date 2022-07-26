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
                this.email = email
            })
            .catch((err) => console.log("err:", err))
    },
    data() {
        return {
            posts: [],
            email: null
        }
    }
}
</script>

<template>
    <div v-if="email" class="container-sm">
        <PostForm></PostForm>
        <div v-if="posts.length === 0">Pas de posts sur le mur. Commencez à poster !</div>
        <div v-for="post in posts">
            <Card 
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

<style>

</style>