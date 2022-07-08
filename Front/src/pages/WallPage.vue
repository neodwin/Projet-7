<script>
import "../../public/custom.css"
import Card from "./post/Card.vue"
import PostForm from "./post/PostForm.vue"
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
        const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
        const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`
        const options = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        }
        fetch(url, options)
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
        <div v-for="post in posts">
            <Card 
                :email="post.user" 
                :content="post.content" 
                :url="post.imageUrl" 
                :comments="post.comments"
                > 
            </Card>
        </div>
    </div>
</template>

<style>

</style>