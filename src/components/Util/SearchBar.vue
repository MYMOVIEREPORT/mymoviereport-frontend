<template>
  <div class="search-bar-container">
    <input type="text" v-model="keyword" placeholder="영화 검색" class="search-input" />
    <button @click="searching" class="search-btn">
      <SearchIcon fill="#0984e3" />
    </button>
  </div>
</template>

<script>
import SearchIcon from "../Icon/SearchIcon";
export default {
  name: "SearchBar",
  data() {
    return {
      keyword: ""
    };
  },
  components: {
    SearchIcon
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

      this.keyword = "";
    }
  }
};
</script>

<style>
.search-input {
  background-color: transparent;
  border: 1px solid white;
  border-radius: 0.6rem;
  padding: 0.5rem 1rem;
  width: 100%;
  caret-color: white;
  color: white;
}

.search-input::placeholder {
  font-style: italic;
}

.search-input:focus {
  outline: none;
}

.search-bar-container {
  display: flex;
  align-items: center;
}
.search-btn {
  background-color: transparent;
  border: none;
  border-radius: 3px;
  padding: 0.5rem 0.7rem;
  margin-left: 0.5rem;
}
.search-btn :focus {
  outline: none;
}
</style>
