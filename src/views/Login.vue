<template>
  <div class="container">
    <h4 class="text-center font-weight-bold mb-3">로그인</h4>
    <LoginForm />
  </div>
</template>

<script>
import LoginForm from "../components/Auth/LoginForm";
export default {
  name: "Login",
  components: {
    LoginForm
  },
  created() {
    if (this.$store.getters.isAuthenticated) {
      this.$router.push("/");
    }
  }
};
</script>

<style>
</style>