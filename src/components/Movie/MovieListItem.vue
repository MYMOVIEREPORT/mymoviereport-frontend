<template>
  <div class="list-item-container" @click="goToMovie">
    <h6>{{movie.title_ko ? movie.title_ko : '-'}}</h6>
    <h6 class="text-muted font-italic">{{movie.title_en ? movie.title_en : '-'}}</h6>
    <img class="movie-poster" :src="movie.poster_url ?  movie.poster_url: blankImageUrl" />
  </div>
</template>

<script>
export default {
  name: "MovieListItem",
  data() {
    return {
      blankImageUrl:
        "https://images-na.ssl-images-amazon.com/images/I/41959Ga9RbL._SY550_.jpg"
    };
  },
  props: {
    movie: {
      type: Object
    }
  },
  methods: {
    goToMovie() {
      this.$router.push(`/movie/${this.movie.id}`);
    }
  }
};
</script>

<style scoped>
.list-item-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  cursor: pointer;
}
.movie-poster {
  flex-grow: 1;
  width: 100%;
  object-fit: cover;
}
</style>