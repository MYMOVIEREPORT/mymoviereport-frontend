<template>
  <div>
    <!-- 영화 디테일 -->
    <div class="container pt-5">
      <Loading v-if="!movie" />
      <!-- 해당 영화의 평가 -->
      <MovieDetail v-else :movie="movie" />
    </div>
    <!-- 영화에 대한 유저들의 스코어 페이지 -->
    <div class="dark-bg etc">
      <div class="container">
        <MovieUserScore :posts="moviePosts" />
        <PostList :posts="moviePosts" :small="true" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieDetail from "../components/Movie/MovieDetail";
import PostList from "../components/Post/PostList";
import MovieUserScore from "../components/Movie/MovieUserScore";
import { mapGetters } from "vuex";
import Loading from "../components/Util/Loading";
export default {
  name: "Movie",
  components: {
    MovieDetail,
    PostList,
    MovieUserScore,
    Loading
  },
  props: {
    movieId: {
      type: String
    }
  },
  computed: {
    ...mapGetters(["movie", "moviePosts", "isAuthenticated"])
  },
  mounted() {
    this.$store.dispatch("getMovieAction", this.movieId);
    this.$store.dispatch("getMoviePostsAction", this.movieId);
  }
};
</script>

<style>
</style>