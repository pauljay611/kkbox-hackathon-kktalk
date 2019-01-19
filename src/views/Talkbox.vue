<template>
  <div class="talkbox wrap">
    <div class="main container">
      <div class="row">
        <!-- <div class="left col-md-3 p-0">
          <div class="login mt-3" v-if="$store.state.token=='undefined'">
            <a
              href="javascript:void(0)"
              class="btn btn-lg btn-login-kkbox"
              @click="getAuth"
            >KKBOX LOGIN</a>
          </div>
          <div class="profile mt-3" v-if="$store.state.profile!=''">
            <div class="profile-photo text-center">
              <img :src="$store.state.profile.images[0].url" alt class="img-fluid rounded">
            </div>
            <div class="profile-info">
              <ul>
                <li>
                  <a :href="$store.state.profile.url">{{$store.state.profile.name}}</a>
                </li>
                <li>
                  <span>{{$store.state.profile.description}}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="sidebar mt-3">
            <ul class="p-0">
              <li :class="{ 'active': linkActive.post}">
                <router-link to="/post" class="nav-item">
                  <span>發文</span>
                </router-link>
              </li>
              <li :class="{ 'active': linkActive.article}">
                <router-link to="/articles" class="nav-item">
                  <span>所有文章</span>
                </router-link>
              </li>
              <li :class="{ 'active': linkActive.profile}">
                <router-link to="/profile" class="nav-item">
                  <span>個人檔案</span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>-->
        <div class="right col-md-12 p-0">
          <div class="chatroom p-0">
            <div class="header">
              <div class="container">
                <div class="row">
                  <div class="header-main col-lg-12">
                    <div class="header-title p-0">
                      <router-link to="/board">PKK實業坊</router-link>
                    </div>
                    <div class="header-subtitle p-0" v-if="title!=''">
                      <router-link :to="title.url">{{title.name}}</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <router-view :title="title" @handle="changeTitle"></router-view>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "talkbox",
  data() {
    return {
      token: "",
      data: "",
      chatroom: "",
      title: "",
      linkActive: { url: "/articles", name: "所有文章" }
    };
  },
  methods: {
    getAuth() {
      window.location.href =
        "https://account.kkbox.com/oauth2/authorize?response_type=code&client_id=6a87d0847e4de3e6fc3f51a79bfc93c6&state=123&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fredirect";
    },
    changeTitle(title) {
      this.title = title;
    }
  },
  created() {
    // var vm = this;
    // this.$bus.$on("active", function(item) {
    //   vm.linkActive = item;
    // });
  },
  beforeDestroy: function() {
    this.$bus.$off("active");
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.wrap {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: $color-kkbox-background;
}
.main {
  height: 80%;
  margin-bottom: 5%;
  .left {
    background-color: $color-kkbox-grey;
    height: 600px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .profile .profile-info {
      ul {
        padding: 2%;
        margin: 0;
        margin-top: 5%;
        text-align: center;
        li {
          list-style: none;
          a {
            text-decoration: none;
            font-size: 1.8em;
          }
        }
      }
    }
    .sidebar {
      width: 100%;
      ul li {
        list-style: none;
        text-align: center;
        opacity: 0.5;
        &:hover,
        :active {
          opacity: 1;
          background-color: $color-kkbox-dark-grey;
        }
        .nav-item {
          color: $color-white;
          font-size: 1.5em;
          line-height: 1.8em;
          text-decoration: none;
        }
      }
      ul li.active {
        opacity: 1;
        background-color: $color-kkbox-dark-grey;
      }
    }
    .btn-login-kkbox {
      text-decoration: none;
      background-color: $color-kkbox-blue;
      color: $color-white;
      font-size: 1.2em;
    }
  }
  .right {
    background-color: $color-kkbox-background;
    height: 90vh;
    .chatroom {
      height: 100%;
      background-color: $color-ptt-black;
      .header {
        background-color: $color-ptt-blue;
        .container {
          padding: 0 5%;
          .header-main {
            display: flex;
            .header-title {
              flex: 2;
              a {
                font-size: 1.8em;
                line-height: 1.8em;
                color: $color-ptt-yellow;
              }
            }

            .header-subtitle {
              flex: 13;
              a {
                font-size: 1.8em;
                line-height: 1.8em;
                color: $color-white;
              }
            }
            span {
              text-align: center;
              color: $color-grey;
              opacity: 0.5;
              margin: 0 2%;
            }
            @include response-media($pc) {
              .header-title {
                flex: 2;
              }
              .header-subtitle {
                flex: 8;
              }
            }
            @include response-media($phone) {
              .header-title {
                flex: 2;
              }
              .header-subtitle {
                flex: 3;
              }
            }
          }
        }
      }
    }
  }
}
</style>

