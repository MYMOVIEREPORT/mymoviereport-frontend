<template>
  <div>
    <div v-if="loading">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <div v-else>
      <article>
        <div>
          <h4>미니 영화정보</h4>
          <hr />
          <img :src="post.movie.poster_url" alt />
        </div>
        <div>
          <h4>내가 쓴 포스트 정보</h4>
          <hr />
          <h3>{{post.title}}</h3>
          <h6>{{post.published ? '공개' : '비공개'}}글입니다.</h6>
          <h6>내가 준 점수 : {{post.score}}점</h6>
          <img :src="post.image" alt />
          <p>{{post.content}}</p>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "PostDetail",
  props: {
    postId: {
      type: String
    }
  },
  data() {
    return {
      post: null
    };
  },
  computed: {
    loading() {
      return this.post ? false : true;
    }
  },
  methods: {
    getPost() {
      const reqUrl = "http://localhost:8000";
      axios
        .get(`${reqUrl}/api/v1/post/${this.postId}/`)
        .then(res => {
          const { data } = res;
          this.post = data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getPost();
  }
};
</script>

<style>
img {
  width: 200px;
}
</style>