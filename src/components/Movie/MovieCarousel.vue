<template>
  <Loading v-if="loading" />
  <div v-else id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img :src="movies[0].poster_url" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>첫슬라</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img :src="movies[1].poster_url" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>두슬라</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img :src="movies[2].poster_url" class="d-block w-100" alt="..." />
        <div class="carousel-caption d-none d-md-block">
          <h5>삼슬라</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </div>
      </div>
    </div>
    <a
      class="carousel-control-prev"
      href="#carouselExampleControls"
      role="button"
      data-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
    </a>
    <a
      class="carousel-control-next"
      href="#carouselExampleControls"
      role="button"
      data-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
    </a>
  </div>
</template>

<script>
import Loading from "../Util/Loading";
export default {
  name: "MovieCarousel",
  props: {
    movies: {
      type: Array
    }
  },
  computed: {
    loading() {
      return this.movies ? false : true;
    }
  },
  components: {
    Loading
  }
};
</script>

<style>
.carousel-item img {
  height: 100vh;
  object-fit: cover;
}
</style>