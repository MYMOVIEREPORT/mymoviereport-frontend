<template>
  <div>
    <div v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <PostDetail :post="post" />
      <MovieMiniCard :movie="post.movie" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PostDetail from "../components/Post/PostDetail";
import MovieMiniCard from "../components/Movie/MovieMiniCard";
export default {
  name: "Post",
  components: {
    PostDetail,
    MovieMiniCard
  },
  props: {
    postId: {
      type: String
    }
  },
  data() {
    return {
      post: null
    };
  },
  computed: {
    loading() {
      return this.post ? false : true;
    }
  },
  methods: {
    getPost() {
      const reqUrl = "http://localhost:8000";
      axios
        .get(`${reqUrl}/api/v1/post/${this.postId}/`)
        .then(res => {
          const { data } = res;
          this.post = data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getPost();
  }
};
</script>

<style>
</style>