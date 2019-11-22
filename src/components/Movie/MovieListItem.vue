<template>
  <div @click="goToMovie">
    <h6>{{movie.title_ko ? movie.title_ko : '-'}}</h6>
    <h6 class="text-muted font-italic">{{movie.title ? movie.title : '-'}}</h6>
    <img :src="movie.poster_url ?  movie.poster_url: blankImageUrl" style="width:100%" />
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

<style>
</style>