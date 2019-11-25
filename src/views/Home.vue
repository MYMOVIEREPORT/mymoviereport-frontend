<template>
  <div>
    <div>
      <MovieCarousel :movies="hotMovies" />
    </div>
    <div class="container">
      <div class="row">
        <div class="col-12 col-md-8">
          <div class="mb-3">
            <div>
              <FastTimeIcon />
              <span>LATEST REPORT</span>
            </div>
            <hr />
            <PostList :posts="posts" />
          </div>
        </div>
        <div class="col-12 col-md-4">
          <Ranking />
        </div>
      </div>
      <div class="mb-3">
        <h5>🔥 최근 리포트가 활발한 영화</h5>
        <hr />
        <MovieList :movies="hotMovies" />
      </div>
      <div class="mb-3">
        <h5>신작영화</h5>
        <hr />
        <MovieList :movies="newMovies" />
      </div>
      <div>
        <div>테스트중</div>
        <MovieListHorizontal :movies="newMovies" />
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import PostList from "../components/Post/PostList";
import MovieList from "../components/Movie/MovieList";
import Ranking from "../components/User/Ranking";
import MovieCarousel from "../components/Movie/MovieCarousel";
import MovieListHorizontal from "../components/Movie/MovieListHorizontal";
import FastTimeIcon from "../components/Icon/FastTimeIcon";
import axios from "axios";
export default {
  name: "home",
  components: {
    PostList,
    MovieList,
    Ranking,
    MovieCarousel,
    MovieListHorizontal,
    FastTimeIcon
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
        .get(`${reqUrl}/api/v1/posts/`, {
          params: {
            limit: 6
          }
        })
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
.division-bar {
  border-bottom: 3px solid #596275;
  margin-bottom: 1rem;
}
</style>
