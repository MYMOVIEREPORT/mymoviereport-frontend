<template>
  <div>
    <PostList :posts="posts" :small="true" :mine="true" />
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