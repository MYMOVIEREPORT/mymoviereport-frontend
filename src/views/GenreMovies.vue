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
  name: "GenreMovies",
  components: {
    MovieList,
    InfiniteLoading
  },
  props: {
    genreId: {
      type: String
    }
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
    initialzeMovies() {
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .get(`${reqUrl}/api/v1/movies/`, {
          params: {
            target: this.genreId,
            page: this.page
          }
        })
        .then(({ data }) => {
          this.movies = data;
        });
      this.page += 1;
    },
    infiniteHandler($state) {
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .get(`${reqUrl}/api/v1/movies/`, {
          params: {
            target: this.genreId,
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
  },
  watch: {
    genreId: {
      handler() {
        this.movies = [];
        this.initialzeMovies();
      }
    }
  }
};
</script>

<style>
</style>