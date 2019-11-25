<template>
  <div class="container">
    <UserProfile :user="user" />
    <h5>유저가 쓴 포스트</h5>
    <hr />
    <UserPosts :posts="posts" />
  </div>
</template>

<script>
import axios from "axios";
import UserProfile from "../components/User/UserProfile";
import UserPosts from "../components/User/UserPosts";
export default {
  name: "MyPage",
  components: {
    UserProfile,
    UserPosts
  },
  data() {
    return {
      user: null,
      posts: null
    };
  },
  computed: {
    userId() {
      return this.$store.getters.loggedInUser.user_id;
    },
    requestHeader() {
      return this.$store.getters.requestHeader;
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
    getLoginUsersPosts(reqUrl) {
      axios
        .get(`${reqUrl}/api/v1/user/${this.userId}/posts/`, this.requestHeader)
        .then(res => {
          const { data } = res;
          this.posts = data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    const requestUrl = "http://localhost:8000";
    this.getLoginUser(requestUrl);
    this.getLoginUsersPosts(requestUrl);
  },
  created() {
    // 비 로그인시 차단
    if (!this.$store.getters.isAuthenticated) {
      this.$router.push("/login");
    }
  }
};
</script>

<style>
</style>