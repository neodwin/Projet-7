<script>
import "../../public/custom.css"
export default {
    name: "Card"
}
</script>
<template>
<div class="card mb-3 m-auto">
    <div class="card-header p-2">
        <img 
            src="../assets/avatar.jpg" 
            alt="avatar" 
            class="rounded-circle me-2" 
        />
            Edwin D
    </div>
  <img src="https://mdbcdn.b-cdn.net/img/new/slides/041.webp" class="card-img-top" alt="Wild Landscape"/>
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">
      This is a wider card with supporting text below as a natural lead-in to additional
      content. This content is a little bit longer.
    </p>
    <p class="card-text">
      <small class="text-muted">Last updated 3 mins ago</small>
    </p>
  </div>
</div>
</template>
<style>
.card {
    width: 480px;
}
.card-header img {
    width: 21px;
}
</style>