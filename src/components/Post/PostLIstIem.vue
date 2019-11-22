<template>
  <div class="post-item">
    <img :src="post.image" />
    <img :src="post.movie.poster_url" />
    <p class="text-center">{{post.title}}</p>
    <h6>{{post.published ? '공개' : '비공개'}}</h6>
  </div>
</template>

<script>
export default {
  name: "PostListItem",
  props: {
    post: {
      type: Object
    }
  }
};
</script>

<style>
.post-item {
  border: 1px solid black;
}

.post-item img {
  width: 100%;
}
</style>