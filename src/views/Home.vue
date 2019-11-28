<template>
  <div>
    <div>
      <MovieCarousel v-if="carouselMovies.length>0" :movies="carouselMovies" />
    </div>
    <!-- 최신영화 -->
    <div>
      <div class="container mb-0">
        <h5 class="d-flex align-items-center font-weight-bold">
          <span class="badge badge-danger mr-2">NEW</span>
          <span>신작영화</span>
        </h5>
        <hr />
      </div>
      <div class="m-3">
        <MovieList :movies="newMovies" :horizontal="true" />
      </div>
    </div>
    <!-- 리포트가 활발한 영화 -->
    <div>
      <div class="container mb-0">
        <h5 class="font-weight-bold">🔥 최근 리포트가 활발한 영화</h5>
        <hr />
      </div>
      <div class="m-3">
        <MovieList :movies="hotMovies" :horizontal="true" />
      </div>
    </div>
    <!-- 다크 뷰-->
    <div class="etc dark-bg">
      <div class="container">
        <div class="row">
          <!-- 최근 포스트들 -->
          <div class="col-12 col-md-8">
            <div class="mb-3">
              <h6 class="d-flex align-items-center">
                <FastTimeIcon fill="#e17055" />
                <span class="ml-2 font-weight-bold">최근 리포트</span>
              </h6>
              <hr class="dark-br" />
              <PostList :posts="posts" :small="true" />
            </div>
          </div>
          <!-- 랭킹 -->
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
      newMovies: null,
      carouselMovies: []
    };
  },
  methods: {
    getPublishedPosts() {
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .get(`${reqUrl}/api/v1/posts/`, {
          params: {
            limit: 6
          }
        })
        .then(res => {
          const { data } = res;
          this.posts = data.slice(0, 12);
        })
        .catch(err => console.log(err));
    },
    getHotMovies() {
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .get(`${reqUrl}/api/v1/movies/hot/`)
        .then(res => {
          const { data } = res;
          this.hotMovies = data;
        })
        .catch(err => console.log(err));
    },
    getNewMovies() {
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .get(`${reqUrl}/api/v1/movies/new/`)
        .then(res => {
          const { data } = res;
          this.newMovies = data;

          let copyData = JSON.parse(JSON.stringify(data));

          copyData.sort((a, b) => {
            if (a.score > b.score) return -1;
            else return 1;
          });
          this.carouselMovies = copyData;
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
