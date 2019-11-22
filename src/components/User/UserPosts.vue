<template>
  <div>
    <PostList :posts="posts" />
  </div>
</template>

<script>
import PostList from "../Post/PostList";
export default {
  name: "UserPosts",
  components: {
    PostList
  },
  props: {
    posts: {
      type: Array
    }
  }
};
</script>

<style>
</style>