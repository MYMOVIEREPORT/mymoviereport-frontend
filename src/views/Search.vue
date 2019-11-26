<template>
  <div class="container pt-5">
    <h4>검색 :{{keyword}}</h4>
    <Loading v-if="loading" />
    <div v-else>
      <div v-if="result.movies.length === 0" class="text-center">검색 결과가 없습니다.</div>
      <MovieList v-else :movies="result.movies" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "../components/Util/Loading";
import MovieList from "../components/Movie/MovieList";
export default {
  data() {
    return {
      result: {
        movies: []
      }
    };
  },
  props: {
    keyword: {
      type: String
    }
  },
  components: {
    Loading,
    MovieList
  },
  computed: {
    loading() {
      return this.result ? false : true;
    }
  },
  methods: {
    getSearchResult() {
      const reqUrl = "http://localhost:8000";
      axios
        .get(`${reqUrl}/api/v1/search/`, {
          params: {
            keywords: this.keyword
          }
        })
        .then(res => {
          const { data } = res;
          this.result.movies = data.movies;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getSearchResult();
  },
  watch: {
    keyword: {
      handler() {
        this.getSearchResult();
      }
    }
  }
};
</script>

<style>
</style>