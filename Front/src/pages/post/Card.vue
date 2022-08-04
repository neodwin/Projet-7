<script>
  import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css"
  import Comment from "./Comment.vue"
  import Avatar from "../../components/ui/Avatar.vue"
  import ModifyPost from "../ModifyPost.vue"
  import { getFetchOptions } from "../../../services/fetchOption.js"
  const { VITE_SERVER_ADDRESS, VITE_SERVER_PORT } = import.meta.env
  export default {
      name: "Card",
      components: {
      Comment,
      Avatar,
      ModifyPost,
    },
    props: ["email", "content", "url", "comments", "id", "currentUser", "userId"],
    data() {
      return {
        role: this.isAdmin(),
        currentComment: null,
      }
    },
    mounted() {},
    methods: {
      isAdmin() {
        let userLogged = localStorage.getItem("role")
        if (userLogged === "ADMIN") {
        console.log("L'administrateur est connecté")
        return userLogged
        }
      },
      addComment(e){
        console.log(this.currentComment)
        console.log(this.$props.id)
        const { url, headers } = getFetchOptions()
        const option = {
        headers: { ...headers, "Content-Type": "application/json" }, 
        method: "POST",
        body: JSON.stringify({
          comment: this.currentComment
        })
      }
      fetch(url + "posts/" + this.$props.id, option )
          .then((res)=> {
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
      },
      deletePost(e) {
        const { url, headers } = getFetchOptions()
        fetch(url + "posts/" + this.$props.id, {
          headers: { ...headers, "Content-Type": "application/json" },
          method: "DELETE"
        })
        .then((res)=> {
            if (res.status === 200) {
              return res.json()
            } else {
              throw new Error("Échec de la suppression du post")
            }
          })
          .then((res) => {
            console.log("res:", res)
            this.$router.go()
          })
          .catch((err) => console.log("err:", err))
      },
      likePost(e) {
        console.log("userIdFront:", this.$props.userId)
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts/${this.$props.id}/like`
      fetch(url, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          userId: this.$props.userId,
          postId: this.$props.id,
        }),
      })
        .then((res) => res.json())
        .catch((err) =>
          console.error({ message: "Impossible de liker", err })
        )
    },
    resetLike() {
      const url = `http://${VITE_SERVER_ADDRESS}:${VITE_SERVER_PORT}/posts/${this.$props.id}/like`
      fetch(url, {
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
          "Accept": "application/json",
          "Content-Type": "application/json",
        },
        method: "DELETE",
      })
        .then((res) => console.log("Like supprimé", res))
        .catch((err) =>
          console.error({ message: "Impossible de supprimer le like ", err })
        )
      },
    }
  }
</script>

<template>
<div class="card mb-3 m-auto">
    <div class="card-header">
        <Avatar></Avatar>

            <span>{{ email }}</span>
            <i v-if="this.role == 'ADMIN' || currentUser === email" class="bi bi-trash" @click="deletePost"></i>
            <router-link id="bi-pencil-square" :to="{ name: 'modify', params: { id: id, email: email, url: url }, }" >
            <i v-if="this.role == 'ADMIN' || currentUser === email" class="bi bi-pencil-square"></i> </router-link>
    </div>
  <img v-if="url" :src="url" class="card-img-top" alt="Wild Landscape"/>
  <div class="card-body">
    <p class="card-text">
      {{ content }}
    </p>
    <div class="panel-footer">
        <div class="pull-right">
          <i class="bi bi-hand-thumbs-up-fill" @click="likePost"></i>
        </div>  
    </div>
    <div v-for="comment in comments">
      <Comment :email="comment.user.email" :content="comment.content"></Comment>
    </div>
    <div class="d-flex gap-1">
      <Avatar></Avatar>
      <input type="text" class="form-control" placeholder="Commentaire" aria-label="Commentaire" v-model="currentComment" />
      <button type="button" class="btn ms-auto btn-primary ms-auto rounded-pill" @click="addComment">Poster</button>
    </div>
  </div>
</div>
</template>

<style>
@media (min-width: 768px) {
  .card {
    width: 70%;
  } 
}
  .card-header {
    display: flex;
    align-items: center;
    gap: 15px;
  }
  .bi-trash {
    margin-left: auto;
  }
  .bi-trash:hover {
    cursor: pointer;
    color: rgb(193, 57, 57);
    transform: scale(1.1);
  }
  .bi-pencil-square:hover {
    cursor: pointer;
    color: rgb(193, 57, 57);
    transform: scale(1.1);
  }
  .bi-trash::before {
    font-size: 20px;
  } 
  .panel-footer { 
    padding: 8px !important; 
    background-color: #f9f9f9 !important; 
    border-bottom-right-radius: 0 !important; 
    border-bottom-left-radius: 0 !important; 
  }
  .panel-footer div { 
    width: 15px;
    display: flex; 
    gap: 20px;
    font: 300 normal 1.125em "Roboto",Arial,Verdana,sans-serif !important; 
    color: #34495e; 
    text-align: center; 
    background-color: transparent !important; 
    border: none !important; 
  }
  .bi-hand-thumbs-up-fill:hover {
    cursor: pointer;
    color: rgb(193, 57, 57);
    transform: scale(1.2);
  }
  .bi-hand-thumbs-up-fill::before {
    font-size: 20px;
  }
</style>