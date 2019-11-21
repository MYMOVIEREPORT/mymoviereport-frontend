<template>
  <form class="vue-auth-form">
    <div class="text-center mb-3">로고하나 추가하시고</div>
    <div class="form-group">
      <input class="form-control" type="text" v-model="credential.username" placeholder="사용자 이름" />
    </div>
    <div class="form-group">
      <input class="form-control" type="password" v-model="credential.password" placeholder="비밀번호" />
    </div>
    <p v-if="errorMessage.length > 0" class="text-center" style="color:red">{{errorMessage}}</p>
    <button @click="login" class="btn btn-primary">로그인</button>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "LoginForm",
  data() {
    return {
      credential: {
        username: "",
        password: ""
      },
      errorMessage: ""
    };
  },
  methods: {
    login() {
      const requestUrl = "http://localhost:8000";
      axios
        .post(`${requestUrl}/api-token-auth/`, this.credential)
        .then(res => {
          const { token } = res.data;
          this.$session.set("mmr-token", token); // 세션에 저장
          this.$store.dispatch("setTokenAction", token); // vuex token에 저장

          this.$router.push("/"); // 홈에 보내기
        })
        .catch(() => {
          this.loginAlert();
        });
    },
    loginAlert() {
      this.errorMessage = "아이디 또는 비밀번호가 올바르지 않습니다.";
    }
  }
};
</script>

<style>
</style>