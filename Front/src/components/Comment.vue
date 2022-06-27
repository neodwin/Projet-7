<script>
    import Avatar from "./Avatar.vue"
    export default {
        name: "Comment",
        components: {
            Avatar
        }
    }
</script>

<template>
    <div class="d-flex gap-1">
        <Avatar></Avatar>
        <div class="d-flex flex-column p-1 commentary">
            <p>Anthony B</p>
            <p>Magnifique photo</p>
        </div>
        
    </div>
</template>

<style scoped>
.card-body > .d-flex {
    margin-bottom: 15px;
}
.commentary {
    background-color: #FFD7D7;
    border-radius: 5px;
    width: 100%;
}
.d-flex p {
    margin-bottom: 0;
}
.d-flex p:nth-child(1) {
    font-weight: 500;
}
</style>