<template>
  <div class="chat col-md-10">
    <h1>112345</h1>
  </div>
</template>
<script>
export default {
  name: "chat",
  data() {
    return {
      playList: [1, 2, 3, 4, 5]
    };
  },
  mounted() {
    this.$bus.$emit("active", {
      home: false,
      explorer: false,
      chat: true
    });
  }
};
</script>
<style lang="scss" scoped>
</style>
