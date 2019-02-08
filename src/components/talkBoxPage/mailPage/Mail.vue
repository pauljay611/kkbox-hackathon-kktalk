<template>
  <div class="mail">
    <div
      v-if="mailContent!=''"
      class="container"
    >
      <div class="row">
        <div class="col-md-12 header mt-3">
          <div class="header-author">
            <div class="title">
              作者
            </div>
            <div class="content">
              <a
                :href="mailContent.sender.url"
                target="_blank"
              >
                {{ mailContent.sender.name }}
              </a>
            </div>
          </div>
          <div class="header-category">
            <div class="title">
              分類
            </div>
            <div class="content">
              <a
                :href="mailContent.category.url"
                target="_blank"
              >
                【 {{ mailContent.categoryType }} 】【 {{ mailContent.category.name }} 】
              </a>
            </div>
          </div>
          <div class="header-title">
            <div class="title">
              標題
            </div>
            <div class="content">
              <a
                :href="mailContent.category.url"
                target="_blank"
              >
                {{ mailContent.title }}
              </a>
            </div>
          </div>
          <div class="header-time">
            <div class="title">
              時間
            </div>
            <div class="content">
              {{ mailContent.time | moment("ddd MMM D &nbsp; HH:mm:ss YYYY") }}
            </div>
          </div>
        </div>
        <div class="main col-md-12 mt-3">
          <div class="main-header mb-2">
            <a
              :href="mailContent.category.url"
              target="_blank"
            >
              <img
                class="img-fluid"
                :src="mailContent.category.images[0].url"
                alt
              >
            </a>
          </div>
          <div
            class="main-content"
            v-text="mailContent.content"
          />
          <div class="main-bottom">
            <span>--</span>
            <p>※ 發信站: KK實業坊(pkk.cc)</p>
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="mailContent!=''"
      class="commentBar col-md-12 text-center"
    >
      <div class="commentBtn">
        <router-link
          v-if="$store.state.profile.id!=mailContent.sender.id"
          class="ml-3"
          :to="'/reply/'+$route.params.id"
        >
          <md-icon>reply</md-icon>
        </router-link>
      </div>
    </div>

    <div
      id="commentModal"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div
        class="modal-dialog modal-dialog-centered"
        role="document"
      >
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">
              發表推文
            </h5>
          </div>
          <div class="modal-body">
            <div class="emoji">
              <p class="word">
                {{ commentWord }}
              </p>
              <div class="icon">
                <span @click="changeComment('thumb_up')">
                  <md-icon :class="active.up">
                    thumb_up
                  </md-icon>
                </span>
                <span @click="changeComment('thumb_down')">
                  <md-icon :class="active.down">
                    thumb_down
                  </md-icon>
                </span>
                <span @click="changeComment('chat')">
                  <md-icon :class="active.chat">
                    chat
                  </md-icon>
                </span>
              </div>
            </div>
            <input
              v-model="comment"
              type="text"
            >
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-primary"
              data-dismiss="modal"
              @click="sendComment"
            >
              確定
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Mail",
  data() {
    return {
      mailContent: "",
      mailsList: [],
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
  mounted() {
    this.getMail();
  },
  methods: {
    sendComment() {
      var vm = this;
      this.$firebase
        .database()
        .ref("test/mails/" + this.$route.params.id + "/comment")
        .push({
          type: this.commentType,
          content: this.comment,
          time: Date.now(),
          name: this.$store.state.profile
        });
      this.getComment();
    },
    getMail() {
      var vm = this;
      this.$firebase
        .database()
        .ref(
          "test/users/" +
            this.$store.state.profile.id +
            "/mailbox/" +
            this.$route.params.id
        )
        .once("value")
        .then(function(snapshot) {
          vm.mailContent = snapshot.val();
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.mail {
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
        width: 100%;
        .title {
          width: 10%;
          background-color: $color-grey;
          color: #000088;
          padding: 0 1%;
          text-align: center;
        }
        .content {
          width: 90%;
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
