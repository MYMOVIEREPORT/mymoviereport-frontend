<template>
  <div
    class="modal fade"
    :id="`movie-${movie.id}`"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLongTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLongTitle">🎞 티켓팅</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <form>
            <input id="title" type="text" v-model="post.title" placeholder="제목을 입력하세요" />
            <hr />
            <textarea id="content" type="text" v-model="post.content" placeholder="내용을 입력하세요" />

            <div class="form-group row">
              <label class="col-sm-4 col-form-label" for="score">평점</label>
              <div class="col-sm-8">
                <input
                  id="score"
                  class="form-control"
                  type="number"
                  step="0.1"
                  v-model="post.score"
                />
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
          </form>
        </div>
        <div class="modal-footer">
          <button class="btn btn-primary" @click="createPost">
            <Loading v-if="requesting" />
            <span>완료</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Loading from "../Util/Loading";
import { mapGetters } from "vuex";
export default {
  name: "PostFormModal",
  data() {
    return {
      post: {
        title: "",
        content: "",
        score: 5,
        published: false,
        image: "",
        movie_id: this.$store.getters.movie.id
      },
      requesting: false
    };
  },
  components: {
    Loading
  },
  computed: {
    ...mapGetters(["requestHeader", "movie"])
  },
  methods: {
    createPost() {
      const reqUrl = "http://localhost:8000";
      if (!this.requesting) {
        this.requesting = true;
        axios
          .post(`${reqUrl}/api/v1/post/create/`, this.post, this.requestHeader)
          .then(res => {
            const { data } = res;

            // 평가에 추가
            this.$store.dispatch("updateMoviePostsAction", data);
            // 모달 제거
            const body = document.querySelector("body");
            const modal = document.querySelector(".modal");
            const modalBack = document.querySelector(".modal-backdrop");
            modal.classList.toggle("show");
            modal.style.display = "none";
            modalBack.remove();
            body.classList.toggle("modal-open");

            this.requesting = false;
            // 평가한 포스트라고 알려주기
            this.$emit("userPosted");
          })
          .catch(err => console.log(err.response));
      }
    }
  }
};
</script>

<style scoped>
.modal-content {
  background-color: #bfad83;
  border: none;
}

#title {
  border: none;
  width: 100%;
  padding: 0.5rem;
  background-color: transparent;
}

input,
textarea:focus {
  outline: none;
}

#content {
  width: 100%;
  border: none;
  padding: 0.5rem;
  background-color: transparent;
}
</style>