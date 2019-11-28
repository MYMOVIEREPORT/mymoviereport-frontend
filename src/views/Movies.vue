<template>
  <div class="container pt-5">
    <ul class="nav nav-tabs my-3">
      <li class="nav-item dropdown">
        <div
          class="nav-link dropdown-toggle"
          data-toggle="dropdown"
          role="button"
          aria-haspopup="true"
          aria-expanded="false"
          style="font-weight:bold;"
        >장르선택</div>
        <div class="dropdown-menu">
          <router-link
            class="dropdown-item"
            v-for="genre in genres"
            :key="genre.id"
            :to="`/movies/genre/${genre.id}`"
          >{{genre.name}}</router-link>
        </div>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/movies" style="color:#4a69bd;font-weight:bold;">전체보기</router-link>
      </li>

      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/movies/score/7/10"
          style="color:#4a69bd;font-weight:bold;"
        >😍 호평 영화</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/movies/score/4/7"
          style="color:#4a69bd;font-weight:bold;"
        >🤔 괜찮은 영화</router-link>
      </li>
      <li class="nav-item">
        <router-link
          class="nav-link"
          to="/movies/score/1/4"
          style="color:#4a69bd;font-weight:bold;"
        >😨 평가가 낮은 영화</router-link>
      </li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "Movies",
  data() {
    return {
      genres: [],
      requesting: false
    };
  },
  methods: {
    getGenres() {
      const requestUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .get(`${requestUrl}/api/v1/genres/`)
        .then(({ data }) => {
          this.genres = data;
        })
        .catch(err => console.log(err));
    },
    onClickGenre(id) {
      this.selectedGenreId = id;
    },
    onClickMenu(e) {
      const dom = e.target;
      dom.classList.add("active");
    }
  },
  mounted() {
    this.getGenres();
  }
};
</script>

<style></style>
