<template>
  <!-- 기존 포스트리스트 -->
  <div>
    <div v-if="!small">
      <div class="row">
        <div class="col-12 col-sm-6 my-1" v-for="post in publishedPosts" :key="post.id">
          <PostListItem :post="post" />
        </div>
      </div>
    </div>
    <!-- 작은 포스트리스트 -->
    <div v-else-if="small && mine">
      <div class="row">
        <div class="col-4 my-3" v-for="post in posts" :key="post.id">
          <PostListItemSmall :post="post" />
        </div>
      </div>
    </div>
    <div v-else>
      <div class="row">
        <div class="col-4 my-3" v-for="post in publishedPosts" :key="post.id">
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
    },
    mine: {
      type: Boolean
    }
  },
  computed: {
    publishedPosts() {
      if (this.posts) {
        return this.posts.filter(post => post.published === true);
      }
      return [];
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