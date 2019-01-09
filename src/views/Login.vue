<template>
  <div class="Login d-flex align-items-center">
    <div class="container">
      <div class="row d-flex justify-content-center">
        <div class="col-md-4 text-center loginForm">
          <div class="logo">
            <div class="loginLogo d-flex align-items-center justify-content-center">
              <img
                src="http://fakeimg.pl/100x100/"
                class="img-fluid rounded"
                alt="Responsive image"
              >
            </div>
          </div>
          <div class="form">
            <div class="inputBlock">
              <input type="text" placeholder="account">
            </div>
            <div class="inputBlock">
              <input type="text" placeholder="password">
            </div>
          </div>
          <div class="loginBottom">
            <a href="javascript:void(0)" class="btn btn-lg btn-login-normal" @click="getAuth">LOGIN</a>
          </div>
          <div class="seperate">
            <div class="seperateLine">or</div>
          </div>
          <div class="loginBottom">
            <a
              href="javascript:void(0)"
              class="btn btn-lg btn-login-kkbox"
              @click="getAuth"
            >KKBOX LOGIN</a>
          </div>
        </div>
        <div class="col-md-6 text-center content-form">
          <h1>PAIRBOX</h1>
          <div class="intro border text-left"></div>
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
      data: "",
      auth: ""
    };
  },
  methods: {
    getMusic() {
      console.log(this.data.access_token)
      this.$axios
        .get(
          "https://api.kkbox.com/v1.1/me",
          { headers: { Authorization: "Bearer " + this.data.access_token } }
        )
        .then(response => {
          console.log(this.data.access_token)
        });
    },
    getAuth() {
      window.location.href =
        "https://account.kkbox.com/oauth2/authorize?response_type=code&client_id=6a87d0847e4de3e6fc3f51a79bfc93c6&state=123&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fredirect";
    }
  },
  mounted() {
    this.$axios.get("http://localhost:3000/token").then(response => {
      console.log(response.data);
      this.data = response.data;
    }).then(()=>{
      this.getMusic();
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color-dark-blue: #135ca4;
$color-kkbox-blue: #00aed8;
$color-white: #ffffff;

.Login {
  height: 100vh;
}
.loginForm {
  background-color: $color-white;
  padding: 50px;
  box-shadow: 0px 0px 15px #c8c8c8;
}
.logo {
  .loginLogo {
    margin: 10%;
  }
}
.form {
  width: 100%;
  .inputBlock {
    width: 100%;
    margin: 8% 0;
    input {
      width: 100%;
      height: 50px;
      padding: 10px;
      border: none;
      border: solid 1px #ccc;
      border-radius: 1px;
    }
  }
}
.seperate {
  position: relative;
  width: 100%;
}
.seperateLine::after {
  position: absolute;
  background: rgb(196, 25, 25);
  content: "";
  height: 1px;
  top: 60%;
  right: 25%;
  width: 20%;
}
.seperateLine::before {
  position: absolute;
  background: rgb(196, 25, 25);
  content: "";
  height: 1px;
  left: 25%;
  top: 60%;
  width: 20%;
}
.loginBottom {
  width: 100%;
  .btn-login-kkbox,
  .btn-login-normal {
    width: 100%;
    height: 44px;
    margin: 8% 0;
    font-size: 15px;
    color: #ffffff;
    text-decoration: none;
  }
  .btn-login-kkbox {
    background-color: $color-kkbox-blue;
  }
  .btn-login-normal {
    background-color: $color-dark-blue;
  }
}
.content-form {
  background-color: $color-dark-blue;
  padding: 50px;
  box-shadow: 0px 0px 15px #c8c8c8;
  h1 {
    color: $color-white;
  }
}
</style>
