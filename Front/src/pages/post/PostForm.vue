<script>
    export default {
        name: "PostForm",
        data: function () {
            return {
            content: ""
            };
        },
        methods: {
            manageClick() {
                const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
                const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts`

                const options = {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        "Content-Type": "application/json",
                        "Accept": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify({
                      content: this.content
                    })
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
                        console.log("res:", res)
                        this.$router.go()
                    })
                    .catch((err) => console.log("err:", err))
            }
        }
    }
</script>

<template>
    <div class="form-floating mt-4">
        <div class="form-outline mt-1">
            <input class="form-control" id="textAreaExample1" rows="4" v-model="content" />
        </div>
    </div>
    <div class="d-flex">
        <label for="file-input" class="btn btn-secondary mt-1" >Ajouter une image</label>
        <input id="file-input" type="file" />
        <button @click="manageClick" type="button" class="btn mt-1 ms-auto btn-primary">Poster</button>
    </div>

    {{ content }}

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
