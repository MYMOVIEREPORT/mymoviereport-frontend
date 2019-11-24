<template>
  <div>
    <h3>(공개된)포스트리스트</h3>
    <hr />
    <PostList :posts="posts" />
    <h3>떠오르는영화</h3>
    <hr />
    <MovieList :movies="hotMovies" />
    <h3>신작영화</h3>
    <hr />
    <MovieList :movies="newMovies" />
    <h3>랭킹</h3>
    <hr />
  </div>
</template>

<script>
// @ is an alias to /src
import PostList from "../components/Post/PostList";
import MovieList from "../components/Movie/MovieList";
import axios from "axios";
export default {
  name: "home",
  components: {
    PostList,
    MovieList
  },
  data() {
    return {
      posts: null,
      hotMovies: null,
      newMovies: null
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
    },
    getHotMovies() {
      const reqUrl = "http://localhost:8000";
      axios
        .get(`${reqUrl}/api/v1/movies/hot/`)
        .then(res => {
          const { data } = res;
          this.hotMovies = data;
        })
        .catch(err => console.log(err));
    },
    getNewMovies() {
      const reqUrl = "http://localhost:8000";
      axios
        .get(`${reqUrl}/api/v1/movies/new/`)
        .then(res => {
          const { data } = res;
          this.newMovies = data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getPublishedPosts();
    this.getNewMovies();
    this.getHotMovies();
  }
};
</script>
