<template>
  <div class="redirect">
    {{ data }}
  </div>
</template>

<script>
import router from "@/router";

export default {
  name: "Redirect",
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    this.oauthRedirect();
  },
  methods: {
    oauthRedirect() {
      this.$axios.defaults.headers.post["Content-Type"] =
        "application/x-www-form-urlencoded";
      this.$axios.defaults.headers.get["Content-Type"] =
        "application/x-www-form-urlencoded";
      this.$axios.defaults.transformRequest = [
        function(data) {
          let ret = "";
          for (let it in data) {
            ret +=
              encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
          }
          return ret;
        }
      ];
      this.$axios
        .post(
          "/token",
          {
            client_id: process.env.VUE_APP_TOKEN_ID,
            grant_type: "authorization_code",
            client_secret: process.env.VUE_APP_TOKEN_SECRET,
            code: this.$route.query.code
          },
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          }
        )
        .then(response => {
          this.$store.commit("SET_TOKEN", response.data.access_token);
          this.data = response.data;
          router.push("/");
        });
    }
  }
};
</script>
