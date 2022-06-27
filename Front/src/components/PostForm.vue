<script>
    export default {
        name: "PostForm"
    }
</script>

<template>
    <div class="form-floating mt-4">
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
</template>

<style module>
label[for="file-input"] {
    background-color: #FD2D01;
}
input[id="file-input"] {
    display: none;
}
</style>
