<template>
  <div>
    <input type="text" v-model="keyword" placeholder="두글자 이상 검색" />
    <button @click="searching">검색</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    searching() {
      // 현재 검색 페이지인 경우

      if (this.keyword.length < 2) {
        return;
      }

      if (this.$router.history.current.name !== "search") {
        this.$router.push(`/search/${this.keyword}`);
      } else if (
        this.$router.history.current.name === "search" &&
        this.$router.history.current.params.keyword !== this.keyword
      ) {
        this.$router.push(`/search/${this.keyword}`);
      }
    }
  }
};
</script>

<style>
</style>