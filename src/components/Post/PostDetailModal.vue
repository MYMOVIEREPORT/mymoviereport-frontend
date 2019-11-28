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
        <div v-if="modify" class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLongTitle">REPORTING</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <form>
              <input id="title" type="text" v-model="updatedPost.title" placeholder="제목을 입력하세요" />
              <small v-if="errMessage.title" class="form-text text-danger">
                {{
                errMessage.title
                }}
              </small>
              <hr />
              <textarea
                id="content"
                type="text"
                v-model="updatedPost.content"
                placeholder="내용을 입력하세요"
                style="height:300px;"
              />
              <small v-if="errMessage.content" class="form-text text-danger">
                {{
                errMessage.content
                }}
              </small>
              <hr />
              <h5 class="text-center">평점</h5>
              <div class="d-flex justify-content-center my-3">
                <StarRating
                  :star-size="25"
                  v-model="updatedPost.score"
                  :max-rating="10"
                  :increment="0.5"
                  :show-rating="false"
                  active-color="#e74c3c"
                />
              </div>
              <small v-if="errMessage.score" class="form-text text-danger">
                {{
                errMessage.score
                }}
              </small>
              <div class="form-check text-center my-3">
                <input
                  class="form-check-input"
                  type="checkbox"
                  v-model="updatedPost.published"
                  id="defaultCheck1"
                />
                <label class="form-check-label" for="defaultCheck1">리포트 공개여부</label>
              </div>

              <Uploader
                @photoUploaded="onPhotoUploaded"
                @uploadError="onPhotoErreor"
                @uploading="onUploading"
              />
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="onModify">취소</button>
            <button class="btn btn-primary" @click="updatePost">
              <span>완료</span>
            </button>
          </div>
        </div>

        <!-- 보여주기 뷰 -->
        <div v-else class="modal-content">
          <div class="modal-header p-0">
            <img :src="post.image" />
          </div>
          <div class="modal-body">
            <!-- 타이틀 + 공개여부 -->
            <div class="d-flex justify-content-between align-items-center px-3">
              <h5 class="m-0">{{ post.title }}</h5>
              <input type="text" name id v-show="modify" />
              <h6 class="m-0">
                <span v-if="post.published" class="badge badge-success">공개중</span>
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
                <div class="d-flex flex-column align-items-center justify-content-center ml-3">
                  <div
                    class="d-flex flex-column align-items-center justify-content-center"
                    v-if="
											!isAuthenticated || loggedInUser.user_id !== post.user
										"
                  >
                    <div style="font-size:0.5rem" class="text-muted">NEED REPORT</div>
                    <NotCertifiedMark />
                  </div>
                  <div
                    class="d-flex flex-column align-items-center justify-content-center"
                    v-if="isAuthenticated && loggedInUser.user_id === post.user"
                  >
                    <div style="font-size:0.5rem;color:#fbc531;">REPORTED</div>
                    <CertifiedMark fill="#fbc531" />
                  </div>
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

          <!-- 모달 푸터 -->
          <div class="modal-footer">
            <div v-if="isAuthenticated">
              <div v-if="loggedInUser.user_id === post.user" class="d-flex m-3">
                <button class="btn btn-sm btn-danger m-1" @click="deletePost">
                  <TrashIcon />
                </button>
                <button class="btn btn-sm btn-warning m-1" @click="onModify">
                  <UpdateIcon />
                </button>
              </div>
            </div>
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
import TrashIcon from "../Icon/TrashIcon";
import UpdateIcon from "../Icon/UpdateIcon";
import Uploader from "../Util/Uploader";
export default {
  name: "PostDetail",
  data() {
    return {
      modify: false,
      uploading: false,
      updatedPost: {
        content: this.post.content,
        title: this.post.title,
        image: this.post.image,
        score: this.post.score,
        published: this.post.published
      },
      errMessage: {
        content: "",
        title: "",
        image: "",
        score: "",
        published: ""
      }
    };
  },
  props: {
    post: {
      type: Object
    }
  },
  components: {
    StarRating,
    CertifiedMark,
    NotCertifiedMark,
    TrashIcon,
    UpdateIcon,
    Uploader
  },
  computed: {
    ...mapGetters(["requestHeader", "isAuthenticated", "loggedInUser"])
  },
  methods: {
    removeModal() {
      const body = document.querySelector("body");
      const modal = document.querySelector(".modal");
      const modalBack = document.querySelector(".modal-backdrop");
      modal.classList.toggle("show");
      modal.style.display = "none";
      modalBack.remove();
      body.classList.toggle("modal-open");
    },
    deletePost() {
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
      axios
        .delete(`${reqUrl}/api/v1/post/${this.post.id}/`, this.requestHeader)
        .then(() => {
          this.removeModal();
          this.$store.dispatch("deleteMoviePostAction", this.post.id);
          this.$store.dispatch("deleteUserPostAction", this.post.id);
        })
        .catch(err => console.log(err.response));
    },
    onPhotoUploaded(data) {
      this.uploading = false;
      alert("성공적으로 업로드 되었습니다!");
      const { Location } = data;
      this.post.image = Location;
    },
    onPhotoErreor(err) {
      this.uploading = false;
      alert("업로드에 실패했습니다.");
      console.log(err);
    },
    onUploading() {
      this.uploading = true;
    },
    // 이하 수정
    onModify() {
      this.modify = !this.modify;
    },
    updatePost() {
      this.errMessage = {
        content: "",
        title: "",
        image: "",
        score: "",
        published: ""
      };
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
      if (!this.uploading) {
        axios
          .put(
            `${reqUrl}/api/v1/post/${this.post.id}/`,
            this.updatedPost,
            this.requestHeader
          )
          .then(() => {
            // 교체작업 필요하긴 함
            this.modify = !this.modify;
            for (let key in this.updatedPost) {
              this.post[key] = this.updatedPost[key];
            }
          })
          .catch(err => {
            const { data } = err.response;
            for (let key in data) {
              if (data.hasOwnProperty(key)) {
                this.errMessage[key] = data[key][0];
              }
            }
          });
      }
    }
  }
};
</script>

<style scoped>
img {
  width: 100%;
  object-fit: cover;
  max-height: 400px;
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

.modal-content {
  /* background-color: #bfad83; */
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
