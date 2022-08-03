<script>
const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env

    export default {
        name: "modify",
        props: ["id", "email", "url"],
        data() {
            return {
            content: "",
            selectImage: null
            }
        },
        methods: {
            handleNewFile(e) { 
                this.selectImage = e.target.files[0]
            },
            modifyPost() {
                const id = this.$props.id
                const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/` 
                const headers = {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Accept": "application/json"
                }

                const formData = new FormData()
                formData.append("content", this.content)
                formData.append("image", this.selectImage)

                fetch(url + "home/modify/" + id, {
                headers: { ...headers, "Content-Type": "application/json" },
                method: "PUT",
                body: formData,
                })
                .then((res)=> {
                    if (res.status === 200) {
                    return res.json()
                    } else {
                    throw new Error("Échec de la modification du post")
                    }
                })
                .then((res) => {
                    console.log("res:", res)
                    this.$router.go()
                })
                .catch((err) => console.log("err:", err))
            }
        }
    }
</script>

<template>
    <div class="form-floating mt-3">
        <div class="form-outline mt-1">
            <input class="form-control" id="textAreaExample1" rows="4" v-model="content" />
        </div>
    </div>
    <div class="d-flex">
        <label for="file-input" class="btn btn-secondary mt-1" >Ajouter une image</label>
        <span v-if="selectImage">{{ selectImage.name }}</span>
        <input id="file-input" type="file" @change="handleNewFile" />
        <button @click="modifyPost" type="button" class="btn mt-1 ms-auto btn-primary ms-auto rounded-pill">Modifier le post</button>
    </div>
    <hr class="dropdown-divider mt-4" />
</template>

<style scoped>
label[for="file-input"] {
    background-color: #FD2D01;
}
div span {
    font-size: 15px;
    margin: 15px;
}
input[id="file-input"] {
    display: none;
}
</style>
