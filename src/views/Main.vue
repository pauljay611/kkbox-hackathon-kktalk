<template>
  <div class="mainPage">
    <div class="row">
      <sidebar />
      <div class="wrap col-md-10">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import sidebar from "@/components/Sidebar.vue";
export default {
  name: "MainPage",
  components: {
    sidebar
  },
  computed: {
    ...mapState({
      token: state => state.token
    })
  }
};
</script>
<style lang="scss" scoped>
@import '@/assets/css/base.scss';
.mainPage {
  height: 100vh;
  width: 100vw;
  background-color: $color-white;
  .wrap {
    padding: 2% 4%;
  }
}
</style>

