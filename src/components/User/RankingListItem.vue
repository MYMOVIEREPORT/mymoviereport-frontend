<template>
  <div class="row ranking-list-wrapper">
    <div class="col-4">
      <h5 class="m-0 text-center rank"># {{ rank + 1 }}</h5>
    </div>
    <div class="col-8 d-flex align-items-center justify-content-center">
      <div class="mr-3">
        <img :src="ranker.thumbnail ? ranker.thumbnail : blankImageUrl" class="rounded-circle" />
      </div>
      <h5 class="m-0">{{ ranker.username }}</h5>
    </div>
  </div>
</template>

<script>
export default {
  name: "RankingListItem",
  props: {
    ranker: {
      type: Object
    },
    rank: {
      type: Number
    }
  },
  data() {
    return {
      blankImageUrl:
        "https://mmr-album.s3.ap-northeast-2.amazonaws.com/1574919030204NoPhoto.png"
    };
  }
};
</script>

<style scoped>
.ranking-list-wrapper {
  display: flex;
  align-items: center;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
img {
  width: 2rem;
  height: 2rem;
  object-fit: cover;
}
</style>
