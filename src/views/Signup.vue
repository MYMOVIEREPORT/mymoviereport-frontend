<template>
  <div class="container pt-5">
    <h4 class="text-center font-weight-bold mb-3">회원가입</h4>
    <SignupForm />
  </div>
</template>

<script>
import SignupForm from "../components/Auth/SignupForm";
export default {
  components: {
    SignupForm
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