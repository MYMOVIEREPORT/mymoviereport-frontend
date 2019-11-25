<template>
  <div class="post-wrapper">
    <div
      class="post-view"
      @click="goToPostDetail"
      @mouseover="showText"
      @mouseleave="hiddenText"
      :style="cardStyle"
    >
      <h4 v-show="textShow" class="text-center">{{post.title}}</h4>
    </div>
  </div>
</template>

<script>
export default {
  name: "PostListItem",
  data() {
    return {
      textShow: false,
      cardStyle: {
        backgroundImage: `url(${this.post.image})`
      }
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
    showText() {
      this.textShow = true;
    },
    hiddenText() {
      this.textShow = false;
    }
  }
};
</script>

<style>
.post-wrapper {
  position: relative;
  overflow: hidden;
  border-radius: 3px;
}
.post-view {
  height: 15rem;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0 solid #000;
  overflow: hidden;
}
.post-view:hover {
  transform: scale(1.3);
  transition: all ease 1.5s;
}
</style>