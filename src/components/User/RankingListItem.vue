<template>
  <div class="row ranking-list-wrapper">
    <div class="col-4">
      <h4 class="m-0 text-center rank"># {{rank+1}}</h4>
    </div>
    <div class="col-8 d-flex align-items-center justify-content-center">
      <div class="mr-3">
        <img :src="ranker.thumbnail ? ranker.thumbnail : blankImageUrl" class="rounded-circle" />
      </div>
      <h4 class="m-0">{{ranker.username}}</h4>
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
        "https://cdn.business2community.com/wp-content/uploads/2017/08/blank-profile-picture-973460_640.png"
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
  width: 3rem;
  height: 3rem;
  object-fit: cover;
}
</style>