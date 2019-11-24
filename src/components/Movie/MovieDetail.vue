<template>
  <div>
    <!-- 영화 디테일 -->
    <h1 class="d-inline">{{movie.title_ko}}</h1>
    <h3 class="text-muted font-italic d-inline">{{movie.title ? movie.title : '-'}}</h3>
    <hr />

    <div class="row mb-3">
      <!-- 포스터 -->
      <div class="col">
        <img :src="movie.poster_url ? movie.poster_url : blankImageUrl" style="width:100%" />
      </div>
      <!-- 영화 세부 내용 -->
      <div class="col">
        <!-- 장르(일단 대표장르만 하나) -->
        <h3 class="text-center">⭐️ {{movie.score}}</h3>
        <h5 class="text-center">{{movie.genre.name}}</h5>
        <!-- 감독'들' -->
        <div class="text-center mb-2">
          <h6 class="m-0">감독</h6>
          <span v-if="!movie.directors">-</span>
          <span
            v-else
            class="mr-1"
            v-for="director in movie.directors"
            :key="'director-' + director.id"
          >{{director.name}}</span>
        </div>
        <!-- 배우'들' -->
        <div class="text-center">
          <h6 class="m-0">배우</h6>
          <span v-if="!movie.actors">-</span>
          <span
            v-else
            class="mr-1"
            v-for="actor in movie.actors"
            :key="'actor-'+ actor.id"
          >{{actor.name}}</span>
        </div>
        <hr />
        <p>{{movie.description ? movie.description :'-'}}</p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <h4>예고편</h4>
        <hr />
        <iframe
          v-if="movie.video_url"
          :src="movie.video_url"
          frameborder="0"
          style="width:100% ;height:500px;"
        ></iframe>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "MovieDetail",
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
  }
};
</script>

<style>
</style>