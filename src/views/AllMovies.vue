<template>
  <div>
    <MovieList :movies="movies" />
    <!-- 인피니티 스크롤-->
    <InfiniteLoading @infinite="infiniteHandler" />
  </div>
</template>

<script>
import axios from "axios";
import MovieList from "../components/Movie/MovieList";
import InfiniteLoading from "vue-infinite-loading";
export default {
  name: "AllMovies",
  components: {
    MovieList,
    InfiniteLoading
  },
  data() {
    return {
      page: 1,
      movies: []
    };
  },
  computed: {
    loading() {
      return this.movies ? false : true;
    }
  },
  methods: {
    infiniteHandler($state) {
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .get(`${reqUrl}/api/v1/movies/`, {
          params: {
            page: this.page
          }
        })
        .then(({ data }) => {
          if (data.length) {
            this.page += 1;
            this.movies.push(...data);
            $state.loaded();
          } else {
            $state.complete();
          }
        });
    }
  }
};
</script>

<style>
</style>