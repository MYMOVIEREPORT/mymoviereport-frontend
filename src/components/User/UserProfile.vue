<template>
  <div>
    <Loading v-if="loading" />
    <div v-else>
      <div class="mb-2">
        <img :src="user.thumbnail" class="rounded mx-auto d-block thumbnail" />
      </div>
      <h3 class="text-center">{{user.username}}</h3>
      <h5 class="text-center text-muted font-italic">{{user.email}}</h5>
    </div>
  </div>
</template>

<script>
import Loading from "../Util/Loading";
export default {
  name: "UserProfile",
  components: {
    Loading
  },
  computed: {
    loading() {
      return this.user ? false : true;
    }
  },
  props: {
    user: {
      type: Object
    }
  }
};
</script>

<style>
.thumbnail {
  width: 200px;
}
</style>