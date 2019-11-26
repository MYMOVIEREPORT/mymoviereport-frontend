<template>
  <div class="post-wrapper" @click="goToPostDetail" @mouseover="active" @mouseleave="deactivate">
    <div class="post-image-wrapper">
      <img :src="post.image" alt />
    </div>
    <div class="post-text" v-show="textShow">
      <div>{{post.movie.title_ko}}</div>
      <div class="m-0">{{post.title}}</div>
      <div>{{post.score}}점</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostListItemSmall",
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
      const imageTag = this.$el.firstChild;
      imageTag.classList.add("active");
    },
    deactivate() {
      this.textShow = false;
      const imageTag = this.$el.firstChild;
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
}

.active {
  transform: scale(1.1);
  transition: all ease 1s;
  opacity: 0.5;
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