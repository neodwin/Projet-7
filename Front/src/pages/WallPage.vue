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
    created() {
        const token = localStorage.getItem("token")
        if (token == null) {
            this.$router.push("/login")
        }
    }
}
</script>

<template>
    <div class="container-sm">
        <PostForm></PostForm>
        <Card></Card>
        <Card></Card>
        <Card></Card>
    </div>
</template>

<style>

</style>