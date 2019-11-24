<template>
  <div>
    <div v-if="isUserPosted">이미 평가한 영화입니다.</div>
    <div v-else>
      <form action>
        <h4>평가</h4>
        <hr />
        <div class="form-group row">
          <label class="col-sm-4 col-form-label" for="title">제목</label>
          <div class="col-sm-8">
            <input id="title" class="form-control" type="text" v-model="post.title" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label" for="content">내용</label>
          <div class="col-sm-8">
            <textarea id="content" class="form-control" type="text" v-model="post.content" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label" for="score">평점</label>
          <div class="col-sm-8">
            <input id="score" class="form-control" type="number" step="0.1" v-model="post.score" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label" for="published">공개여부</label>
          <div class="col-sm-8">
            <input id="published" class="form-control" type="checkbox" v-model="post.published" />
          </div>
        </div>
        <div class="form-group row">
          <label class="col-sm-4 col-form-label" for="image">이미지(업로드로바꿔야함)</label>
          <div class="col-sm-8">
            <input id="image" class="form-control" type="text" v-model="post.image" />
          </div>
        </div>
        <button class="btn btn-primary" @click="createPost">작성</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostForm",
  props: {
    movieId: {
      type: Number
    }
  },
  data() {
    return {
      post: {
        title: "",
        content: "",
        score: 5,
        published: false,
        image: "",
        movie_id: this.movieId
      },
      loggedInUserPosts: null
    };
  },
  computed: {
    requestHeader() {
      return this.$store.getters.requestHeader;
    },
    userId() {
      return this.$store.getters.loggedInUser.user_id;
    },
    isUserPosted() {
      if (this.loggedInUserPosts) {
        const isPostExist = this.loggedInUserPosts.some(
          post => post.movie.id === this.movieId
        );

        if (isPostExist) {
          return true;
        } else {
          return false;
        }
      }
      return true;
    }
  },
  methods: {
    createPost() {
      const reqUrl = "http://localhost:8000";
      axios
        .post(`${reqUrl}/api/v1/post/create/`, this.post, this.requestHeader)
        .then(res => {
          const { data } = res;
          if (data.published === true) {
            this.$emit("postCreated", data);
          }
          this.getLoggedInUsersPost();
        })
        .catch(err => console.log(err.response));
    },
    getLoggedInUsersPost() {
      axios
        .get(
          `http://localhost:8000/api/v1/user/${this.userId}/posts/`,
          this.requestHeader
        )
        .then(res => {
          const { data } = res;
          this.loggedInUserPosts = data;
        })
        .catch(err => console.log(err.response));
    }
  },
  mounted() {
    this.getLoggedInUsersPost();
  }
};
</script>

<style>
</style>