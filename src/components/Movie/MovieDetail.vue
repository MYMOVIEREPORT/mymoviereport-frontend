<template>
  <div>
    <!-- 영화 타이틀, 추가버튼-->
    <div>
      <div class="d-flex align-items-center">
        <h1 class="m-0 mr-2">{{movie.title_ko}}</h1>
        <PostForm v-if="isAuthenticated" />
      </div>
      <div>
        <h3 class="text-muted font-italic">{{movie.title_en ? movie.title_en : '-'}}</h3>
      </div>
    </div>
    <hr />
    <!-- 영화 디테일 -->
    <div class="row mb-3">
      <!-- 포스터 -->
      <div class="col-12 col-md-4">
        <img :src="movie.poster_url ? movie.poster_url : blankImageUrl" style="width:100%" />
      </div>
      <!-- 영화 세부 내용 -->
      <div
        class="col-12 col-md-8 d-flex flex-column justify-content-center align-items-center my-3"
      >
        <h3 class="d-flex justify-content-center align-items-center" v-if="movie.score !== 0">
          <StarIcon fill="#f9ca24" />
          <span class="ml-1">{{movie.score}}</span>
        </h3>
        <!-- 감독'들' -->
        <div class="text-center mb-2" v-if="movie.directors.length > 0">
          <h6 class="m-0 font-weight-bold">감독</h6>
          <span
            class="mr-1 people"
            v-for="director in movie.directors"
            :key="'director-' + director.id"
          >{{director.name}}</span>
        </div>
        <!-- 배우'들' -->
        <div class="text-center mb-3" v-if="movie.actors.length>0">
          <h6 class="m-0 font-weight-bold">배우</h6>
          <span
            class="mr-1 people"
            v-for="actor in movie.actors"
            :key="'actor-'+ actor.id"
          >{{actor.name}}</span>
        </div>

        <!-- 장르(일단 대표장르만 하나) -->
        <h6 class="text-center">{{movie.genre.name}}</h6>

        <div>
          <p
            class="text-center text-muted m-0"
            style="font-size:0.9rem"
            v-html="movie.description ? parsingDescription :'-'"
          ></p>
        </div>
      </div>
    </div>
    <!-- 예고편 -->
    <div class="row">
      <div v-if="movie.video_url" class="col">
        <div class="d-flex align-items-center">
          <MovieIcon fill="#c0392b" />
          <span class="ml-1 font-weight-bold">관련영상</span>
        </div>
        <hr />
        <div style="position:relative;padding-top:56.25%;">
          <iframe
            v-if="movie.video_url"
            :src="movie.video_url"
            frameborder="0"
            style="position:absolute;top:0;left:0;width:100%;height:100%;"
            allowfullscreen
          ></iframe>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostForm from "../Post/PostForm";
import StarIcon from "../Icon/StarIcon";
import MovieIcon from "../Icon/MovieIcon";
export default {
  name: "MovieDetail",
  data() {
    return {
      blankImageUrl:
        "https://mmr-album.s3.ap-northeast-2.amazonaws.com/1574919021313NoMovie.png"
    };
  },
  components: {
    PostForm,
    StarIcon,
    MovieIcon
  },
  computed: {
    ...mapGetters(["movie", "isAuthenticated"]),
    parsingDescription() {
      return this.movie.description.replace(/(?:\r\n|\r|\n)/g, "<br />");
    }
  }
};
</script>

<style>
.people {
  font-size: 0.9rem;
}
</style>