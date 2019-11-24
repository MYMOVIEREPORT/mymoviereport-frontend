<template>
  <div>
    <div v-if="loading">loading..</div>
    <div v-else>
      <MovieDetail :movie="movie" />
      <h5>유저 평가들</h5>
      <hr />
      <PostList :posts="posts" />
      <div v-if="isAuthenticated">
        <PostForm :movieId="movie.id" @postCreated="onPostCreated" />
      </div>
    </div>
  </div>
</template>

<script>
import MovieDetail from "../components/Movie/MovieDetail";
import PostForm from "../components/Post/PostForm";
import PostList from "../components/Post/PostList";
import axios from "axios";
export default {
  name: "Movie",
  components: {
    MovieDetail,
    PostForm,
    PostList
  },
  data() {
    return {
      movie: null,
      posts: []
    };
  },
  props: {
    movieId: {
      type: String
    }
  },
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
    loading() {
      return this.movie ? false : true;
    }
  },
  methods: {
    getMovie() {
      const reqUrl = "http://localhost:8000";
      // 요청 수정 필요
      axios
        .get(`${reqUrl}/api/v1/movie/${this.movieId}/`)
        .then(res => {
          const { data } = res;
          this.movie = data;
        })
        .catch(err => console.log(err));
    },
    getMoviePosts() {
      const reqUrl = "http://localhost:8000";
      // 요청 수정 필요
      axios
        .get(`${reqUrl}/api/v1/movie/${this.movieId}/posts/`)
        .then(res => {
          const { data } = res;
          this.posts = data;
        })
        .catch(err => console.log(err));
    },
    onPostCreated(post) {
      this.posts.push(post);
    }
  },
  mounted() {
    this.getMovie();
    this.getMoviePosts();
  }
};
</script>

<style>
</style>