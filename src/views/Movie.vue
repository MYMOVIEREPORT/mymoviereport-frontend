<template>
  <div>
    <div v-if="!movie">loading..</div>
    <div v-else>
      <MovieDetail :movie="movie" />
      <h5>유저 평가들</h5>
      <hr />
      <PostList :posts="moviePosts" />
      <div v-if="isAuthenticated">
        <PostForm :movieId="movie.id" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieDetail from "../components/Movie/MovieDetail";
import PostForm from "../components/Post/PostForm";
import PostList from "../components/Post/PostList";
import { mapGetters } from "vuex";
export default {
  name: "Movie",
  components: {
    MovieDetail,
    PostForm,
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