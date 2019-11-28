<template>
  <div>
    <h6 class="d-flex align-items-center justify-content-center">
      <PrizeIcon fill="#fdcb6e" />
      <span class="ml-2">리포트 랭킹</span>
    </h6>
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
      const reqUrl = process.env.VUE_APP_REQUEST_URL;
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

<style></style>
