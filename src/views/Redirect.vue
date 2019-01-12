<template>
  <div class="redirect">{{data}}</div>
</template>

<script>
import router from "@/router";

export default {
  name: "redirect",
  data() {
    return {
      data: ""
    };
  },
  mounted() {
    this.oauthRedirect();
  },
  methods: {
    // oauthRedirect(){
    //   this.$axios.get("http://localhost:3000/redirect"+location.search).then(response => {
    //     console.log(response.data.access_token)
    //     this.$store.commit('SET_TOKEN', response.data.access_token)
    //     this.data = response.data;
    //     router.push('/')
    // });
    // }
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
            client_id: "6a87d0847e4de3e6fc3f51a79bfc93c6",
            grant_type: "authorization_code",
            client_secret: "2151c7c702c1c3c42aedb85a172b254b",
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
