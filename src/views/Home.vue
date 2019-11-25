<template>
  <h3>
    <div class="row">
      <div class="col-12 col-md-8">
        <div class="mb-3">
          <h3 class="division-title">⏳ LATEST REPORT</h3>
          <div class="division-bar" />
          <PostList :posts="posts" />
        </div>
      </div>
      <div class="col-12 col-md-4">
        <h3 class="division-title">랭킹</h3>
        <div class="division-bar" />
        <Ranking />
      </div>
    </div>
    <div class="mb-3">
      <h3 class="division-title">🔥 최근 리포트가 활발한 영화</h3>
      <div class="division-bar" />
      <MovieList :movies="hotMovies" />
    </div>
    <div class="mb-3">
      <h3 class="division-title">신작영화</h3>
      <div class="division-bar" />
      <MovieList :movies="newMovies" />
    </div>
  </h3>
</template>

<script>
// @ is an alias to /src
import PostList from "../components/Post/PostList";
import MovieList from "../components/Movie/MovieList";
import Ranking from "../components/User/Ranking";
import axios from "axios";
export default {
  name: "home",
  components: {
    PostList,
    MovieList,
    Ranking
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

<style scoped>
.division-title {
  padding: 1rem 1rem 0.5rem 1rem;
}

.division-bar {
  border-bottom: 3px solid #596275;
  margin-bottom: 1rem;
}
</style>
