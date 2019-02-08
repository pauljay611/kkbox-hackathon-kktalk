<template>
  <div class="explorer col-md-10">
    <h1>sssss</h1>
  </div>
</template>
<script>
export default {
  name: "Explorer",
  data() {
    return {
      playList: [1, 2, 3, 4, 5]
    };
  },
  mounted() {
    this.$bus.$emit("active", {
      home: false,
      explorer: true,
      chat: false
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
