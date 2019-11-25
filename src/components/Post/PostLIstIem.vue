<template>
  <div class="post-wrapper" @click="goToPostDetail" @mouseover="active" @mouseleave="deactivate">
    <div class="post-image-wrapper">
      <img :src="post.image" alt />
    </div>
    <div class="post-text" v-show="textShow">
      <h2 class="m-0">{{post.title}}</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostListItem",
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
  border-radius: 3px;
}

.active {
  transform: scale(1.1);
  transition: all ease 1s;
  opacity: 0.3;
}

.post-image-wrapper img {
  width: 100%;
  height: 15rem;
  opacity: 0.9;
}

.post-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>