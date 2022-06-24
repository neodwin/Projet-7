<script>
import "../../public/custom.css"
import Card from "./Card.vue"
export default {
    name: "Wall",
    components: {
        Card
    }
}
</script>

<template>
    <div class="container-sm">
        <div class="form-floating">
            <div class="form-outline mt-1">
                <textarea class="form-control" id="textAreaExample1" rows="4">
                </textarea>
            </div>
        </div>
        <div class="d-flex">
            <label for="file-input" class="btn btn-secondary mt-1" >Ajouter une image</label>
            <input id="file-input" type="file" />
            <button type="button" class="btn mt-1 ms-auto btn-primary">Poster</button>
        </div>

        <hr class="dropdown-divider mt-4" />
        <Card></Card>
        <Card></Card>
        <Card></Card>
    </div>
</template>

<style>
body {
    background-color: #FFD7D7 !important;
}
label[for="file-input"] {
    background-color: green;
}
input[id="file-input"] {
    display: none;
}
</style>