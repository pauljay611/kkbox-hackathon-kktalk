<template>
  <div class="articlePage">
    <div class="container" v-if="articleContent!=''">
      <div class="row">
        <div class="col-md-12 header mt-3">
          <div class="header-author">
            <div class="title">作者</div>
            <div class="content">
              <router-link :to="'/profile/'+articleContent.author.id">{{articleContent.author.name}}</router-link>
            </div>
          </div>
          <div class="header-category">
            <div class="title">分類</div>
            <div class="content">
              <a
                :href="articleContent.category.url"
                target="_blank"
              >【 歌手 】【 {{articleContent.category.name}} 】</a>
            </div>
          </div>
          <div class="header-title">
            <div class="title">標題</div>
            <div class="content">{{articleContent.title}}</div>
          </div>
          <div class="header-time">
            <div class="title">時間</div>
            <div
              class="content"
            >{{articleContent.postTime | moment("ddd MMM D &nbsp; HH:mm:ss YYYY")}}</div>
          </div>
        </div>
        <div class="main col-md-12 mt-3">
          <div class="main-header mb-2">
            <a :href="articleContent.category.url" target="_blank">
              <img class="img-fluid" :src="articleContent.category.images[0].url" alt>
            </a>
          </div>
          <div class="main-content" v-html="articleContent.content"></div>
          <div class="main-bottom">
            <span>--</span>
            <p>※ 發信站: KK實業坊(pkk.cc)</p>
            <p>※ 文章網址: {{"http://localhost:8080"+$route.path}}</p>
          </div>
          <div v-if="commentContent!=''">
            <div class="main-comment" v-for="(item, index) in commentContent[0]" :key="index">
              <div class="emoji pr-2">
                <md-icon :class="item.type">{{item.type}}</md-icon>
              </div>
              <div class="name pr-2">
                <a :href="item.name.url" target="_blank">{{item.name.name}}</a>
                : {{item.content}}
              </div>
              <div class="time">{{item.time | moment("MM/DD HH:mm")}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="commentBar col-md-12 text-center" v-if="articleContent!=''">
      <div class="commentBtn">
        <a href="javascript:void(0)" class="mr-3" data-toggle="modal" data-target="#commentModal">
          <md-icon>chat</md-icon>
        </a>
        <router-link
          class="ml-3"
          :to="'/mail/'+$route.params.id"
          v-if="$store.state.profile.id!=articleContent.author.id"
        >
          <md-icon>mail</md-icon>
        </router-link>
      </div>
    </div>

    <div
      class="modal fade"
      id="commentModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">發表推文</h5>
          </div>
          <div class="modal-body">
            <div class="emoji">
              <p class="word">{{commentWord}}</p>
              <div class="icon">
                <span @click="changeComment('thumb_up')">
                  <md-icon :class="active.up">thumb_up</md-icon>
                </span>
                <span @click="changeComment('thumb_down')">
                  <md-icon :class="active.down">thumb_down</md-icon>
                </span>
                <span @click="changeComment('chat')">
                  <md-icon :class="active.chat">chat</md-icon>
                </span>
              </div>
            </div>
            <input type="text" v-model="comment">
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="sendComment"
            >確定</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "articlePage",
  data() {
    return {
      articleContent: "",
      articlesList: [],
      keyword: "",
      active: {
        up: "thumb_up",
        down: "common",
        chat: "common"
      },
      commentType: "thumb_up",
      commentWord: "值得推薦",
      comment: "",
      commentContent: []
    };
  },
  methods: {
    changeComment(emoji) {
      switch (emoji) {
        case "thumb_up":
          this.active = {
            up: "thumb_up",
            down: "common",
            chat: "common"
          };
          this.commentWord = "值得推薦";
          this.commentType = "thumb_up";
          break;
        case "thumb_down":
          this.active = {
            up: "common",
            down: "thumb_down",
            chat: "common"
          };
          this.commentWord = "給他噓聲";
          this.commentType = "thumb_down";
          break;
        case "chat":
          this.active = {
            up: "common",
            down: "common",
            chat: "chat"
          };
          this.commentWord = "只加註解";
          this.commentType = "chat";
          break;
      }
    },
    sendComment() {
      var vm = this;
      this.$firebase
        .database()
        .ref("articles/" + this.$route.params.id + "/comment")
        .push({
          type: this.commentType,
          content: this.comment,
          time: Date.now(),
          name: this.$store.state.profile
        });
      this.getComment();
    },
    getArticle() {
      var vm = this;
      this.$firebase
        .database()
        .ref("articles/" + this.$route.params.id)
        .once("value")
        .then(function(snapshot) {
          vm.articleContent = snapshot.val();
        });
    },
    getComment() {
      var vm = this;
      vm.commentContent = [];
      this.$firebase
        .database()
        .ref("articles/" + this.$route.params.id + "/comment")
        .once("value")
        .then(function(snapshot) {
          vm.commentContent.push(snapshot.val());
        });
    }
  },
  mounted() {
    this.getArticle();
    this.getComment();
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.articlePage {
  color: $color-white;
  .container {
    padding: 0 5%;
    overflow: auto;
    height: 78vh;
    .header {
      line-height: 1.4em;
      font-size: 1.4em;
      .header-author,
      .header-category,
      .header-title,
      .header-time {
        display: flex;
        .title {
          flex: 1;
          background-color: $color-grey;
          color: #000088;
          padding: 0 1%;
          text-align: center;
        }
        .content {
          flex: 9;
          padding: 0 1%;
          background-color: #000088;
          a {
            color: $color-white;
          }
        }
        @include response-media($phone) {
          .title {
            flex: 3;
          }
          .content {
            flex: 9;
          }
        }
      }
    }
    .main {
      line-height: 1.4em;
      font-size: 1.4em;
      height: 100%;
      .main-content{
        max-width: 100%;
        word-break: break-all;
        word-wrap:break-word; 
      }
      .main-bottom {
        p {
          line-height: 1.2em;
          font-size: 1.2m;
          color: #009900;
        }
      }
      .main-comment {
        display: flex;
        width: 100%;
        .emoji {
          flex: 1;
        }
        .name {
          flex: 10;
          a {
            color: $color-white;
          }
        }
      }
    }
  }
  .commentBar {
    color: $color-grey;
    line-height: 1.4em;
    font-size: 1.4em;
    cursor: pointer;
    text-decoration: none;
    .commentBtn {
      background-color: $color-ptt-grey;
      a {
        color: $color-grey;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
  .modal {
    color: $color-ptt-black;
    .modal-content {
      background-color: $color-grey;
      .modal-header {
        display: flex;
        justify-content: center;
        border: none;
      }
      .emoji {
        display: flex;
        justify-content: space-between;
        .word {
          flex: 1;
        }
        .icon {
          flex: 1;
          display: flex;
          justify-content: flex-end;
          span {
            margin: 0 2%;
            cursor: pointer;
          }
        }
      }
      input {
        width: 100%;
        padding-left: 2%;
        line-height: 1.6em;
        font-size: 1.6em;
        border: none;
        border: 1px solid $color-ptt-black;
      }
    }
  }
}
</style>
