<template>
  <div class="container pt-5">
    <h4>영화 뷰</h4>
    <MovieList :movies="movies" />
  </div>
</template>

<script>
import axios from "axios";
import MovieList from "../components/Movie/MovieList";
export default {
  name: "Movies",
  data() {
    return {
      movies: null
    };
  },
  computed: {
    loading() {
      return this.movies ? false : true;
    }
  },
  components: {
    MovieList
  },
  mounted() {
    const reqUrl = "http://localhost:8000";
    axios
      .get(`${reqUrl}/api/v1/movies/`, {
        params: {
          limit: 20
        }
      })
      .then(res => {
        const { data } = res;
        this.movies = data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
</style>