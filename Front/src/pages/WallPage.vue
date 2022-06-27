<script>
import "../../public/custom.css"
import Card from "./post/Card.vue"
import PostForm from "./post/PostForm.vue"
export default {
    name: "WallPage",
    components: {
        Card,
        PostForm
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