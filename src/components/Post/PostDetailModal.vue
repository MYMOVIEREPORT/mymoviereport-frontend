<template>
  <article class="post-contents">
    <!-- Modal -->
    <div
      class="modal fade"
      :id="`post-${post.id}`"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLongTitle"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header p-0">
            <img :src="post.image" />
          </div>
          <div class="modal-body">
            <!-- 타이틀 + 공개여부 -->
            <div class="d-flex justify-content-between align-items-center px-3">
              <h5 class="m-0">{{ post.title }}</h5>
              <h6 class="m-0">
                <span v-if="post.published" class="badge badge-success">공개</span>
                <span v-else class="badge badge-secondary">비공개</span>
              </h6>
            </div>
            <hr />
            <!-- 별점 -->

            <!-- 포스트 내용 -->
            <p class="p-3">{{ post.content }}</p>
            <!-- 포스트의 영화 인증 -->
            <div class="certified-container">
              <div class="post-certified">
                <img
                  v-if="post.movie.poster_url"
                  :src="post.movie.poster_url"
                  style="width:70px;border-radius:5px;"
                  class="p-0"
                />
                <!-- <div>{{ post.movie.id }}</div> -->
                <div class="d-flex flex-column align-items-center justify-content-center ml-3">
                  <NotCertifiedMark v-if="!isAuthenticated || loggedInUser.user_id !== post.user" />
                  <CertifiedMark
                    v-if="isAuthenticated && loggedInUser.user_id === post.user"
                    fill="#fbc531"
                  />
                  <h5 class="text-break text-center m-0 mt-1">{{ post.movie.title_ko }}</h5>
                </div>
              </div>
            </div>
            <div class="d-flex justify-content-center my-2">
              <StarRating
                :star-size="25"
                :read-only="true"
                :rating="post.score"
                :max-rating="10"
                :increment="0.5"
                :show-rating="false"
                active-color="#e74c3c"
              />
            </div>
          </div>
          <!-- 로그인 시 수정/삭제 버튼 -->
          <div v-if="isAuthenticated">
            <div v-if="loggedInUser.user_id === post.user" class="d-flex m-3">
              <button class="btn btn-sm btn-danger m-1" @click="deletePost">포스트 삭제</button>
              <button class="btn btn-sm btn-info m-1">포스트 수정</button>
            </div>
          </div>
          <!-- 모달 푸터 -->
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">닫기</button>
          </div>
        </div>
      </div>
    </div>
    <!-- Modal End -->
  </article>
</template>

<script>
import axios from "axios";
import StarRating from "vue-star-rating";
import { mapGetters } from "vuex";
import CertifiedMark from "../Icon/CertifiedMark";
import NotCertifiedMark from "../Icon/NotCertifiedMark";
export default {
  name: "PostDetail",
  props: {
    post: {
      type: Object
    }
  },
  components: {
    StarRating,
    CertifiedMark,
    NotCertifiedMark
  },
  computed: {
    ...mapGetters(["requestHeader", "isAuthenticated", "loggedInUser"])
  },
  methods: {
    deletePost() {
      const reqUrl = "http://localhost:8000";
      axios
        .delete(`${reqUrl}/api/v1/post/${this.post.id}/`, this.requestHeader)
        .then(() => {
          this.$router.push("/mypage");
        })
        .catch(err => console.log(err.response));
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  object-fit: cover;
  max-height: 500px;
}

.post-contents {
  color: black;
}

.certified-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.post-certified {
  display: flex;
}
</style>
