<template>
  <div class="talkbox wrap">
    <div class="main container">
      <div class="row">
        <div class="right col-md-12 p-0">
          <div class="chatroom p-0">
            <div class="header">
              <div class="container">
                <div class="row">
                  <div class="header-main col-lg-12">
                    <div class="header-title p-0">
                      <router-link to="/board">
                        PKK實業坊
                      </router-link>
                    </div>
                    <div
                      v-if="title!=''"
                      class="header-subtitle p-0"
                    >
                      <router-link :to="title.url">
                        {{ title.name }}
                      </router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <router-view
              :title="title"
              @handle="changeTitle"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Talkbox",
  data() {
    return {
      token: "",
      data: "",
      chatroom: "",
      title: "",
      linkActive: { url: "/articles", name: "所有文章" }
    };
  },
  created() {
    // var vm = this;
    // this.$bus.$on("active", function(item) {
    //   vm.linkActive = item;
    // });
  },
  beforeDestroy: function() {
    this.$bus.$off("active");
  },
  methods: {
    changeTitle(title) {
      this.title = title;
    }
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

