<template>
  <div class="error">
    <h1 style="color:white">🚧 찾을수 없는 페이지입니다. 🚧</h1>
  </div>
</template>

<script>
export default {
  name: "Error",
  props: {
    message: {
      type: String
    }
  }
};
</script>

<style>
.error {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #636e72;
}
</style>