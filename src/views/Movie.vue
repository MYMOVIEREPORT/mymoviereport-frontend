<template>
  <div class="container">
    <div v-if="!movie">loading..</div>
    <div v-else>
      <MovieDetail :movie="movie" />
      <h5>유저 평가들</h5>
      <hr />
      <PostList :posts="moviePosts" />
    </div>
  </div>
</template>

<script>
import MovieDetail from "../components/Movie/MovieDetail";
import PostList from "../components/Post/PostList";
import { mapGetters } from "vuex";
export default {
  name: "Movie",
  components: {
    MovieDetail,
    PostList
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