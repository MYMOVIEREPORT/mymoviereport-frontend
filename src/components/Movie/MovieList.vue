<template>
  <div>
    <!-- 전체적 뷰 -->
    <div v-if="!horizontal">
      <div class="row">
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 my-1" v-for="movie in movies" :key="movie.id">
          <MovieListItem :movie="movie" />
        </div>
      </div>
    </div>
    <!-- 수평 뷰 -->
    <div v-else>
      <div class="row overflow-wrapper">
        <div class="overflow-item-container">
          <MovieListHorizontalItem :movie="movie" v-for="movie in movies" :key="movie.id" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import MovieListItem from "./MovieListItem";
import MovieListHorizontalItem from "./MovieListHorizontalItem";
export default {
  name: "MovieList",
  props: {
    movies: {
      type: Array
    },
    horizontal: {
      type: Boolean
    }
  },
  components: {
    MovieListItem,
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