<template>
  <div>
    <div class="d-flex align-items-center">
      <PrizeIcon fill="#fdcb6e" />
      <span class="ml-2">RANKING</span>
    </div>
    <hr class="dark-br" />
    <RankingList :rankers="rankers" />
  </div>
</template>

<script>
import axios from "axios";
import RankingList from "../User/RankingList";
import PrizeIcon from "../Icon/PrizeIcon";
export default {
  name: "Ranking",
  components: {
    RankingList,
    PrizeIcon
  },
  data() {
    return {
      rankers: []
    };
  },
  methods: {
    getRankers() {
      const reqUrl = "http://localhost:8000";
      axios
        .get(`${reqUrl}/api/v1/user/ranks/`)
        .then(res => {
          const { data } = res;
          this.rankers = data;
        })
        .catch(err => console.log(err));
    }
  },
  mounted() {
    this.getRankers();
  }
};
</script>

<style>
</style>