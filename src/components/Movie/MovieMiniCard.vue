<template>
  <!-- 포스트에 연결된 영화 정보 -->
  <div>
    <h4>미니 영화정보</h4>
    <hr />
    <img :src="movie.poster_url" alt />
  </div>
</template>

<script>
export default {
  name: "MovieMiniCard",
  props: {
    movie: {
      type: Object
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
}
</style>