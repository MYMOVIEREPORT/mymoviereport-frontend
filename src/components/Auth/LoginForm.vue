<template>
  <form class="vue-auth-form">
    <h1 class="text-center mb-3">MMR</h1>
    <div class="form-group">
      <input class="form-control" type="text" @keyup="onUsername" placeholder="사용자 이름" />
    </div>
    <div class="form-group">
      <input class="form-control" type="password" @keyup="onPassword" placeholder="비밀번호" />
    </div>
    <p v-if="errorMessage.length > 0" class="text-center" style="color:red">{{ errorMessage }}</p>
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
      const requestUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .post(`${requestUrl}/auth/login/`, this.credential)
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
      this.errorMessage =
        "아이디 또는 비밀번호가 올바르지 않습니다. / 한영키를 확인해주세요.";
    },
    onUsername(e) {
      this.credential.username = e.target.value;
    },
    onPassword(e) {
      this.credential.password = e.target.value;
    }
  }
};
</script>

<style></style>
