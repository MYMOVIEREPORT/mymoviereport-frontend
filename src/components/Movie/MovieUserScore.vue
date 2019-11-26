<template>
  <div>
    <div class="report-title">
      <span>REPORT</span>
    </div>
    <div class="report-info">
      <div class="d-flex align-items-center">
        <span class="info-title mr-3">리포터 수</span>
        <div class="d-flex align-items-center">
          <UserIcon fill="#3498db" />
          <span class="numberInfo ml-3">{{userCount}}명</span>
        </div>
      </div>
      <div class="d-flex align-items-center">
        <span class="info-title mr-3">평점 평균</span>
        <div class="d-flex align-items-center">
          <StarIcon fill="#f9ca24" />
          <span class="numberInfo ml-1">{{avg}}</span>
        </div>
      </div>
      <div class="my-3 hashtag-container">
        <h2 class="mr-1" v-for="(tag,idx) in hashtags" :key="idx">
          <span class="badge badge-secondary">{{tag}}</span>
        </h2>
      </div>
    </div>
  </div>
</template>

<script>
import StarIcon from "../Icon/StarIcon";
import UserIcon from "../Icon/UserIcon";
export default {
  props: {
    posts: {
      type: Array
    }
  },
  components: {
    StarIcon,
    UserIcon
  },
  computed: {
    avg() {
      if (this.posts.length > 0) {
        const sum = this.posts.reduce((acc, post) => (acc += post.score), 0);
        const length = this.posts.length;
        const avgScore = sum / length;
        return avgScore.toFixed(2);
      } else return 0;
    },
    userCount() {
      return this.posts.length;
    },
    hashtags() {
      let allTags = new Set();
      for (let post of this.posts) {
        post.hashtags.forEach(tag => allTags.add(tag.hashtag));
        if (allTags.length > 20) {
          break;
        }
      }
      return allTags;
    }
  }
};
</script>

<style>
.report-title {
  font-size: 4rem;
  text-align: center;
  font-weight: bold;
  margin-bottom: 1rem;
}

.report-title > span {
  border-bottom: 4px solid white;
}

.report-info {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.info-title {
  font-size: 2rem;
}

.numberInfo {
  font-size: 3rem;
}

.hashtag-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>