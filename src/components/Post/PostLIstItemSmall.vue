<template>
  <div>
    <div
      class="post-wrapper"
      data-toggle="modal"
      :data-target="`#post-${post.id}`"
      @mouseover="active"
      @mouseleave="deactivate"
    >
      <div class="post-image-wrapper">
        <img :src="post.image" alt />
      </div>
      <div class="post-text" v-show="textShow">
        <div class="m-0 text-center">{{ post.title }}</div>
        <div class="d-flex align-items-center justify-content-center">
          <StarIcon fill="#f9ca24" />
          <span class="ml-2">{{ post.score }}</span>
        </div>
      </div>
    </div>
    <PostDetailModal :post="post" />
  </div>
</template>

<script>
import PostDetailModal from "./PostDetailModal";
import StarIcon from "../Icon/StarIcon";
export default {
  name: "PostListItemSmall",
  components: {
    PostDetailModal,
    StarIcon
  },
  data() {
    return {
      textShow: false
    };
  },
  props: {
    post: {
      type: Object
    }
  },
  methods: {
    goToPostDetail() {
      this.$router.push(`/post/${this.post.id}`);
    },
    active() {
      this.textShow = true;
      const imageTag = this.$el.firstChild.firstChild;
      imageTag.classList.add("active");
    },
    deactivate() {
      this.textShow = false;
      const imageTag = this.$el.firstChild.firstChild;
      imageTag.classList.remove("active");
    }
  }
};
</script>

<style scoped>
.post-wrapper {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border: 1px solid #ecf0f1;
}

.active {
  transform: scale(1.1);
  transition: all ease 1s;
  opacity: 0.3;
}

.post-image-wrapper img {
  width: 100%;
  height: 10rem;
  opacity: 0.9;
  object-fit: cover;
}

.post-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
