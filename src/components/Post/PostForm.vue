<template>
  <div>
    <div v-if="isUserPostedLoading">포스팅여부 loading..</div>
    <div v-else>
      <div v-if="isUserPosted">이미 평가한 영화입니다.</div>
      <div v-else>
        <button
          type="button"
          class="btn btn-primary"
          data-toggle="modal"
          :data-target="`#movie-${movie.id}`"
        >평가하러 가기</button>
        <PostFormModal :movieId="movie.id" @userPosted="onUserPosted" />
      </div>
    </div>
  </div>
</template>

<script>
import PostFormModal from "./PostFormModal";
import { mapGetters } from "vuex";
import axios from "axios";
export default {
  name: "PostForm",
  components: {
    PostFormModal
  },
  data() {
    return {
      isUserPosted: false,
      isUserPostedLoading: true
    };
  },
  methods: {
    onUserPosted() {
      this.isUserPosted = true;
    },
    getUserPosted() {
      axios
        .get(
          `http://localhost:8000/api/v1/user/${this.userId}/posts/`,
          this.requestHeader
        )
        .then(res => {
          const userPosts = res.data;
          const isPosted = userPosts.some(
            post => post.movie.id === this.movie.id
          );
          if (isPosted) {
            this.isUserPosted = true;
          } else {
            this.isUserPosted = false;
          }
          this.isUserPostedLoading = false;
        })
        .catch(err => console.log(err.response));
    }
  },
  computed: {
    ...mapGetters(["requestHeader", "movie"]),
    userId() {
      return this.$store.getters.loggedInUser.user_id;
    }
  },
  mounted() {
    this.getUserPosted();
  }
};
</script>

<style>
</style>