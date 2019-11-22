<template>
  <div>
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
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
export default {
  name: "UserProfile",
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