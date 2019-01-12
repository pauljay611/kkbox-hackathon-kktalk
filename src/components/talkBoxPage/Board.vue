<template>
  <div class="board">
    <div class="container">
      <div class="row">
        <div class="col-md-12 main">
          <div class="block m-2">
            <div class="block-btn">
              <router-link to="/articles">進入看板</router-link>
            </div>
          </div>
          <div class="block m-2">
            <div class="block-btn">
              <router-link to="/mailbox">個人信箱</router-link>
            </div>
          </div>
          <div class="block m-2">
            <div class="block-btn">
              <router-link :to="'/profile/'+$store.state.profile.id">個人文章</router-link>
            </div>
          </div>
          <div class="block m-2">
            <div class="block-btn">
              <a href="/">登出</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      
    };
  },
  methods: {
    init() {
      this.$store.dispatch("getProfile");
    }
  },
  created() {
    this.init();
  },
  mounted() {
    this.$emit("handle","");
    window.onbeforeunload = function(event) {
      event.preventDefault();
      event.returnValue = "Write something clever here..";
    };
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.board {
  .main {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 78vh;
    width: 100%;
    .block {
      width: 200px;
      height: 200px;
      background-color: $color-kkbox-blue;
      transition: transform 0.2s;
      &:hover {
        color: $color-dark-blue;
        text-decoration: none;
        transform: scale(0.95);
      }
      .block-btn {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        cursor: pointer;
        a {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          color: $color-white;
          font-size: 1.8em;
          line-height: 1.8em;
          transition: transform 0.2s;
          &:hover {
            color: $color-dark-blue;
            text-decoration: none;
          }
        }
      }
    }
    @include response-media($phone) {
      .block {
        width: 100px;
        height: 100px;
        font-size: 0.8em;
        line-height: 0.8em;
      }
    }
  }
}
</style>