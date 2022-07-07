<script>
  import "../../../public/custom.css"
  import Comment from "./Comment.vue"
  import Avatar from "../../components/ui/Avatar.vue"
  export default {
      name: "Card",
      components: {
      Comment,
      Avatar,
    },
    props: ["email", "content", "url", "comments"] 
  }
</script>

<template>
<div class="card mb-3 m-auto">
    <div class="card-header p-2">
        <Avatar></Avatar>

            <span>{{ email }}</span>

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
      <input type="text" class="form-control" placeholder="Commentaire" aria-label="Commentaire" />
      <button type="button" class="btn ms-auto btn-primary">Poster</button>
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