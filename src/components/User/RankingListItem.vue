<template>
  <div class="row ranking-list-wrapper">
    <div class="col-4">
      <h5 v-if="rank === 0" class="m-0 text-center rank" style="color:#fdcb6e">
        <span class="mr-2">
          #
          <FirstPrize fill="#fdcb6e" />
        </span>
      </h5>
      <h5 v-else-if="rank === 1" class="m-0 text-center rank" style="color:#aaa69d"># {{ rank + 1 }}</h5>
      <h5 v-else-if="rank === 2" class="m-0 text-center rank" style="color:#cd6133"># {{ rank + 1 }}</h5>
      <h5 v-else class="m-0 text-center rank"># {{ rank + 1 }}</h5>
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
import FirstPrize from "../Icon/FirstPrize";
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
  components: {
    FirstPrize
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
