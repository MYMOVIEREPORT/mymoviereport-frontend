<template>
  <div>
    <MovieDetail :movie="movie" />
  </div>
</template>

<script>
import MovieDetail from "../components/Movie/MovieDetail";
import axios from "axios";
export default {
  name: "Movie",
  components: {
    MovieDetail
  },
  data() {
    return {
      movie: null
    };
  },
  props: {
    movieId: {
      type: String
    }
  },
  mounted() {
    const reqUrl = "http://localhost:8000";
    // 요청 수정 필요
    axios
      .get(`${reqUrl}/api/v1/movie/${this.movieId}/`)
      .then(res => {
        const { data } = res;
        this.movie = data;
      })
      .catch(err => console.log(err));
  }
};
</script>

<style>
</style>