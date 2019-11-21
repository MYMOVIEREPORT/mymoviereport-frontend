<template>
  <form class="vue-auth-form">
    <div class="text-center mb-3">로고하나 추가하시고</div>
    <div class="form-group">
      <input class="form-control" type="text" v-model="credential.username" placeholder="사용자 이름" />
    </div>
    <div class="form-group">
      <input class="form-control" type="password" v-model="credential.password" placeholder="비밀번호" />
    </div>
    <button @click="login" class="btn btn-primary">로그인</button>
  </form>
</template>

<script>
export default {
  name: "LoginForm",
  data() {
    return {
      credential: {
        username: "",
        password: ""
      }
    };
  },
  methods: {
    login() {
      console.log("로그인 요청");
    }
  }
};
</script>

<style>
</style>