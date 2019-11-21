<template>
  <form class="vue-login-form">
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

<style scoped>
.vue-login-form {
  border: 1px solid rgba(128, 128, 128, 0.342);
  border-radius: 5px;
  padding: 3rem;
}
.btn {
  width: 100%;
}
</style>