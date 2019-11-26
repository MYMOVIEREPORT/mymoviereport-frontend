<template>
  <div>
    <div>
      <MovieCarousel :movies="hotMovies" />
    </div>
    <!-- 최신영화 -->
    <div>
      <div class="container mb-0">
        <h5>신작영화</h5>
        <hr />
      </div>
      <div class="m-3">
        <MovieList :movies="newMovies" :horizontal="true" />
      </div>
    </div>
    <div>
      <div class="container mb-0">
        <h5>🔥 최근 리포트가 활발한 영화</h5>
        <hr />
      </div>
      <div class="m-3">
        <MovieList :movies="hotMovies" :horizontal="true" />
      </div>
    </div>
    <div class="etc dark-bg">
      <div class="container">
        <div class="row">
          <div class="col-12 col-md-8">
            <div class="mb-3">
              <div class="d-flex align-items-center">
                <FastTimeIcon fill="#e17055" />
                <span class="ml-2">LATEST REPORT</span>
              </div>
              <hr class="dark-br" />
              <PostList :posts="posts" :small="true" />
            </div>
          </div>
          <div class="col-12 col-md-4">
            <Ranking />
          </div>
        </div>
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
import FastTimeIcon from "../components/Icon/FastTimeIcon";
import axios from "axios";
export default {
  name: "home",
  components: {
    PostList,
    MovieList,
    Ranking,
    MovieCarousel,
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

<style>
.dark-bg {
  color: white;
}

.dark-br {
  border-top: 1px solid white;
}

.etc {
  padding: 1rem 0;
  background-color: #121212;
}
</style>
