<template>
  <div class="row overflow-wrapper">
    <div class="overflow-item-container">
      <MovieListHorizontalItem :movie="movie" v-for="movie in movies" :key="movie.id" />
    </div>
  </div>
</template>

<script>
import MovieListHorizontalItem from "./MovieListHorizontalItem";
export default {
  name: "MovieListHorizontal",
  props: {
    movies: {
      type: Array
    }
  },
  components: {
    MovieListHorizontalItem
  }
};
</script>

<style>
.overflow-wrapper {
  overflow: hidden;
  overflow-x: auto;
}

.overflow-item-container {
  display: inline-block;
  white-space: nowrap;
}
</style>