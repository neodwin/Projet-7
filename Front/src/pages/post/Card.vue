<script>
  import "../../../public/custom.css"
  import Comment from "./Comment.vue"
  import Avatar from "../../components/ui/Avatar.vue"
  export default {
      name: "Card",
      components: {
      Comment,
      Avatar
    }
  }
</script>

<template>
<div class="card mb-3 m-auto">
    <div class="card-header p-2">
        <Avatar></Avatar>
            Edwin D
    </div>
  <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" class="card-img-top" alt="Wild Landscape"/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">
      This is a wider card with supporting text below as a natural lead-in to additional
      content. This content is a little bit longer.
    </p>
    <div class="pull-right">
      <div class="like-btn d-flex">
        <i id="like1" class="glyphicon glyphicon-thumbs-up">
        </i>
      <div id="like1-bs3">
      </div>
      </div>
      <div class="dislike-btn d-flex">
        <i id="dislike1" class="glyphicon glyphicon-thumbs-down">
        </i>
        <div id="dislike1-bs3">
        </div>
      </div>
    </div>
    <p class="card-text">
      <small class="text-muted">Last updated 3 mins ago</small>
    </p>
    <Comment></Comment>
    <Comment></Comment>

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
.like-btn{
background: #3399ff none repeat scroll 0 0;
border-radius: 3px;
color: white;
padding: 7px 3px 3px 7px;
margin-right: 5px;
margin-top: -5px;
width: 100%;
}
.like-btn i,.dislike-btn i{
color: white !important;
}
.dislike-btn{
background: #FA4E69 none repeat scroll 0 0;
border-radius: 3px;
color: white;
padding: 7px 5px 3px 3px;
margin-top: -5px;
}
</style>