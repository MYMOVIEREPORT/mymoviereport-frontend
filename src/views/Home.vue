<template>
  <div>
    <h3>(공개된)포스트리스트</h3>
    <hr />
    <PostList :posts="posts" />
  </div>
</template>

<script>
// @ is an alias to /src
import PostList from "../components/Post/PostList";
import axios from "axios";
export default {
  name: "home",
  components: {
    PostList
  },
  data() {
    return {
      posts: null
    };
  },
  methods: {
    getPublishedPosts() {
      const reqUrl = "http://localhost:8000";
      axios
        .get(`${reqUrl}/api/v1/posts/`)
        .then(res => {
          const { data } = res;
          this.posts = data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getPublishedPosts();
  }
};
</script>
