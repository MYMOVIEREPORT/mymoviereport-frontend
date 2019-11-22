<template>
  <div class="row">
    <div class="col-6" v-for="post in posts" :key="post.id">
      <PostListItem :post="post" />
    </div>
  </div>
</template>

<script>
import PostListItem from "../Post/PostLIstIem";
export default {
  name: "PostList",
  props: {
    posts: {
      type: Array
    }
  },
  components: {
    PostListItem
  }
};
</script>

<style>
</style>