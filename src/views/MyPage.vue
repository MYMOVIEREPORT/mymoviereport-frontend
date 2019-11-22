<template>
  <div>
    <h5>유저 페이지</h5>
  </div>
</template>

<script>
export default {
  name: "MyPage",
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