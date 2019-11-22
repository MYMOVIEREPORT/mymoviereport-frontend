<template>
  <div>
    <h5>유저 페이지</h5>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "MyPage",
  data() {
    return {
      user: null
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
  mounted() {
    const requestUrl = "http://localhost:8000";
    axios
      .get(`${requestUrl}/api/v1/user/${this.userId}/`, this.requestHeader)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(err));
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