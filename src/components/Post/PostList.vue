<template>
  <div class="row">
    <div class="col-12 col-sm-6 my-1" v-for="post in posts" :key="post.id" style="height:100%;">
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