<template>
  <div class="row">
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 my-1 p-1" v-for="movie in movies" :key="movie.id">
      <MovieListItem :movie="movie" />
    </div>
  </div>
</template>

<script>
import MovieListItem from "./MovieListItem";
export default {
  name: "MovieList",
  props: {
    movies: {
      type: Array
    }
  },
  components: {
    MovieListItem
  }
};
</script>

<style>
</style>