<template>
  <!-- 기존 포스트리스트 -->
  <div>
    <div v-if="!small">
      <div class="row">
        <div class="col-12 col-sm-6 my-1" v-for="post in posts" :key="post.id" style="height:100%;">
          <PostListItem :post="post" />
        </div>
      </div>
      <!-- 작은 포스트리스트 -->
    </div>
    <div v-else>
      <div class="row">
        <div class="col-4 my-3" v-for="post in posts" :key="post.id">
          <PostListItemSmall :post="post" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import PostListItem from "../Post/PostLIstIem";
import PostListItemSmall from "./PostLIstItemSmall";
export default {
  name: "PostList",
  props: {
    posts: {
      type: Array
    },
    small: {
      type: Boolean
    }
  },
  components: {
    PostListItem,
    PostListItemSmall
  }
};
</script>

<style>
</style>