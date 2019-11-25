<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <RankingListItem
        v-for="(ranker,idx) in rankers"
        :ranker="ranker"
        :key="ranker.id"
        :rank="idx"
      />
    </div>
  </div>
</template>

<script>
import Loading from "../Util/Loading";
import RankingListItem from "./RankingListItem";
export default {
  name: "RankingList",
  props: {
    rankers: {
      type: Array
    }
  },
  computed: {
    loading() {
      return this.rankers ? false : true;
    }
  },
  components: {
    RankingListItem,
    Loading
  }
};
</script>

<style>
</style>