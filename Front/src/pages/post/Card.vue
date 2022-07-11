<script>
  import "../../../public/custom.css"
  import Comment from "./Comment.vue"
  import Avatar from "../../components/ui/Avatar.vue"
  import { url, headers } from "../../../services/fetchOption.js"
  export default {
      name: "Card",
      components: {
      Comment,
      Avatar,
    },
    props: ["email", "content", "url", "comments", "id"],
    data() {
      return {
        currentComment: null
      }
    },
    mounted() {},
    methods: {
      addComment(e){
        console.log(this.currentComment)
        console.log(this.$props.id)
        const option = {
        headers: { ...headers, "Content-Type": "application/json" }, 
        method: "POST",
        body: JSON.stringify({
          comment: this.currentComment
        })
      }
      fetch(url + "/" + this.$props.id, option )
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
            //this.currentComment = null
          })
          .catch((err) => console.log("err:", err))
      }
    }
  }
</script>

<template>
<div class="card mb-3 m-auto">
    <div class="card-header p-2">
        <Avatar></Avatar>

            <span>{{ email }}</span>

            <i class="bi bi-trash" @click="deletePost"></i>

    </div>
  <img v-if="url" :src="url" class="card-img-top" alt="Wild Landscape"/>
  <div class="card-body">
    <p class="card-text">
      {{ content }}
    </p>
    <div class="panel-footer">
        <div class="pull-right">
          <font-awesome-icon :icon="['fa-regular', 'thumbs-up']" /> <div id="like1-bs3"></div>
        </div>  
    </div>
    <div v-for="comment in comments">
      <Comment :email="comment.user" :content="comment.content"></Comment>
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
  font: 300 normal 1.125em "Roboto",Arial,Verdana,sans-serif; 
  color: #34495e; 
  text-align: center; 
  background-color: transparent !important; 
  border: none !important; 
  }	

  .svg-inline--fa {
    height: 25px;
  }
</style>