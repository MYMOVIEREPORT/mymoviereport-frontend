<template>
  <Loading v-if="!user" />
  <div v-else class="py-5">
    <div class="container">
      <UserProfile :user="user" />
    </div>
    <!-- 추천 장르  -->
    <div class="container">
      <h5>{{ user.username }}님이 선호하는 장르 추천영화</h5>
      <hr />
    </div>
    <div class="mx-2">
      <MovieList v-if="recommandMovies.length > 0" :horizontal="true" :movies="recommandMovies" />
      <h5 class="text-center text-muted" v-else>영화를 추천하기에 정보가 부족합니다.</h5>
    </div>
    <!-- 포스트 리스트 -->
    <div class="container">
      <h5>유저가 쓴 포스트</h5>
      <hr />
    </div>
    <div class="mx-2">
      <UserPosts v-if="recommandMovies.length > 0" :posts="userPosts" />
      <h5 v-else class="text-center text-muted">남겨진 포스트가 없습니다.</h5>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import UserProfile from "../components/User/UserProfile";
import UserPosts from "../components/User/UserPosts";
import { mapGetters } from "vuex";
import MovieList from "../components/Movie/MovieList";
import Loading from "../components/Util/Loading";

export default {
  name: "MyPage",
  components: {
    UserProfile,
    UserPosts,
    MovieList,
    Loading
  },
  data() {
    return {
      user: null,
      recommandMovies: []
    };
  },
  computed: {
    ...mapGetters(["requestHeader", "userPosts"]),
    userId() {
      return this.$store.getters.loggedInUser.user_id;
    }
  },
  methods: {
    getLoginUser(reqUrl) {
      axios
        .get(`${reqUrl}/api/v1/user/${this.userId}/`, this.requestHeader)
        .then(res => {
          const { data } = res;
          this.user = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    getRecommandMovies() {
      const requestUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .get(
          `${requestUrl}/api/v1/user/${this.userId}/recos/`,
          this.requestHeader
        )
        .then(res => {
          const { data } = res;

          if (data.constructor === Array) {
            this.recommandMovies = data;
          }
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    const requestUrl = process.env.VUE_APP_REQUEST_URL;
    this.getLoginUser(requestUrl);
    this.getRecommandMovies();
    this.$store.dispatch("getUserPostsAction", this.userId);
  },
  created() {
    // 비 로그인시 차단
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/login");
    }
  }
};
</script>

<style></style>
