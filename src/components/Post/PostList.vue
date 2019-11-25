<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 my-1 p-1" v-for="post in posts" :key="post.id" style="height:100%;">
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