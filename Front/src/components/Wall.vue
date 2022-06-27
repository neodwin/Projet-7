<script>
import "../../public/custom.css"
import Card from "./Card.vue"
import PostForm from "./PostForm.vue"
export default {
    name: "Wall",
    components: {
        Card,
        PostForm
    }
}
</script>

<template>
    <div class="container-sm">
        <PostForm></PostForm>
        <hr class="dropdown-divider mt-4" />
        <Card></Card>
        <Card></Card>
        <Card></Card>
    </div>
</template>

<style>

</style>