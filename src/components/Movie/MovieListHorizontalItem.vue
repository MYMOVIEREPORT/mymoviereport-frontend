<template>
  <div class="movie-item-wrapper" @click="goToMovie" @mouseover="active" @mouseleave="deactivate">
    <div class="movie-poster">
      <img :src="movie.poster_url ?  movie.poster_url: blankImageUrl" />
    </div>
    <!-- <div v-show="contentShow" class="movie-item-content">
      <div class="contents">
        <div id="title">{{movie.title_ko ? movie.title_ko : '-'}}</div>
        <div id="title-en">{{movie.title_en ? movie.title_en : '-'}}</div>
        <div class="my-3">⭐️ {{movie.score}}</div>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  name: "MovieListHorizontalItem",
  data() {
    return {
      blankImageUrl:
        "https://mmr-album.s3.ap-northeast-2.amazonaws.com/1574919021313NoMovie.png",
      contentShow: false
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
    },
    active() {
      this.contentShow = true;
      const imageTag = this.$el.firstChild;
      imageTag.classList.add("active");
    },
    deactivate() {
      this.contentShow = false;
      const imageTag = this.$el.firstChild;
      imageTag.classList.remove("active");
    }
  }
};
</script>

<style scoped>
.movie-item-wrapper {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  height: 100%;
  display: inline-block;
}

.movie-poster {
  width: 300px;
  height: 100%;
  padding: 1rem;
}

.movie-poster img {
  width: 100%;
  height: 100%;
  opacity: 0.9;
  object-fit: cover;
}

.movie-item-content {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.contents {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.active {
  transform: scale(1.1);
  transition: all ease 1.3s;
  /* opacity: 0.3; */
}

#title {
  text-align: center;
}

#title-en {
  color: #c44569;
  /* text-align: center; */
}
</style>