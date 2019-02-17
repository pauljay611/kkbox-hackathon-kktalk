<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="col-md-12 main">
          <div
            v-if="$store.state.token=='123'"
            class="login mt-3"
          >
            <a
              href="javascript:void(0)"
              class="btn btn-lg btn-login-kkbox"
              @click="getAuth"
            >
              KKBOX LOGIN
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Login",
  data() {
    return {
      playList: [1, 2, 3, 4, 5]
    };
  },
  mounted() {
    this.$bus.$emit("active", "");
    console.log(process.env);
  },
  methods: {
    getAuth() {
      window.location.href = `https://account.kkbox.com/oauth2/authorize?response_type=code&client_id=${
        process.env.VUE_APP_TOKEN_ID
      }&state=123&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fredirect`;
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.login {
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 78vh;
  }
}
.btn-login-kkbox {
  text-decoration: none;
  background-color: $color-kkbox-blue;
  color: $color-white;
  font-size: 1.2em;
  &:hover {
    text-decoration: none;
  }
}
</style>