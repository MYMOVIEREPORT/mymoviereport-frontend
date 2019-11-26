<template>
  <Loading v-if="loading" />
  <div v-else id="carouselExampleControls" class="carousel slide" data-ride="carousel">
    <div class="carousel-inner">
      <div class="carousel-item active">
        <div class="gradient-container">
          <img :src="movies[0].poster_url" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-caption d-none d-md-block">
          <h5>{{movies[0].title_ko}}</h5>
          <p>{{movies[0].description}}</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="gradient-container">
          <img :src="movies[1].poster_url" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-caption d-none d-md-block">
          <h5>{{movies[1].title_ko}}</h5>
          <p>{{movies[1].description}}</p>
        </div>
      </div>
      <div class="carousel-item">
        <div class="gradient-container">
          <img :src="movies[2].poster_url" class="d-block w-100" alt="..." />
        </div>
        <div class="carousel-caption d-none d-md-block">
          <h5>{{movies[2].title_ko}}</h5>
          <p>{{movies[2].description}}</p>
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
  position: relative;
  z-index: -1;
  display: block;
  height: 100vh;
  width: 100%;
}

.gradient-container {
  display: inline-block;
  width: 100%;
  background: rgb(10, 10, 9);
  background: -moz-linear-gradient(
    0deg,
    rgba(10, 10, 9, 1) 0%,
    rgba(7, 8, 9, 1) 5%,
    rgba(2, 0, 36, 0.013042717086834688) 100%
  );
  background: -webkit-linear-gradient(
    0deg,
    rgba(10, 10, 9, 1) 0%,
    rgba(7, 8, 9, 1) 5%,
    rgba(2, 0, 36, 0.013042717086834688) 100%
  );
  background: linear-gradient(
    0deg,
    rgba(10, 10, 9, 1) 0%,
    rgba(7, 8, 9, 1) 5%,
    rgba(2, 0, 36, 0.013042717086834688) 100%
  );
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#0a0a09",endColorstr="#020024",GradientType=1);
}
</style>