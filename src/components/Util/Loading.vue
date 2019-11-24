<template>
  <div v-if="size === 'small'" class="spinner-border spinner-border-sm" role="status">
    <span class="sr-only">Loading...</span>
  </div>
  <div v-else class="spinner-border" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</template>

<script>
export default {
  name: "Loading",
  props: {
    size: {
      type: String
    }
  }
};
</script>

<style>
</style>