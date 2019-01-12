<template>
  <div class="mail">
    <div class="container">
      <div class="row" v-if="recipient!=''">
        <div class="title col-md-12">
          <p class="text-center m-0">回應至作者信箱</p>
        </div>
        <div class="recipient col-md-12">
          <p class="m-0">收件者</p>
          <input
            class="border rounded pl-3"
            type="text"
            placeholder="作者"
            v-model="recipient.author.name"
            disabled="disabled"
          >
        </div>
        <div class="mail-category col-md-12 mt-3">
          <p class="m-0">分類</p>
          <input
            class="border rounded pl-3"
            type="text"
            placeholder="輸入分類"
            disabled="disabled"
            v-model="recipient.category.name"
          >
        </div>
        <div class="mail-title col-md-12 mt-3">
          <p class="m-0">標題</p>
          <input
            class="border rounded pl-3"
            type="text"
            placeholder="輸入標題"
            disabled="disabled"
            v-model="recipient.title"
          >
        </div>
        <div class="mail-content col-md-12 mt-3">
          <p class="m-0">內容</p>
          <textarea
            class="border rounded pl-3 content"
            type="text"
            placeholder="輸入內容"
            v-model="content"
          ></textarea>
        </div>
        <div class="mail-send col-md-12 mt-2">
          <div class="send rounded text-center" data-toggle="modal" data-target="#mailModal">
            <a href="javascript:void(0)">發送</a>
          </div>
        </div>
        <div
          class="modal fade"
          id="mailModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">確認發送訊息?</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button
                  type="button"
                  @click="sendMail"
                  class="btn btn-primary"
                  data-dismiss="modal"
                >發送</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import modal from "@/components/modal/Modal";
export default {
  name: "mail",
  data() {
    return {
      searchList: [],
      disabled: false,
      recipient: "",
      title: "",
      content: "",
      category: ""
    };
  },
  methods: {
    getArticle() {
      var vm = this;
      this.$firebase
        .database()
        .ref("test/articles/" + this.$route.params.id)
        .once("value")
        .then(function(snapshot) {
          vm.recipient = snapshot.val();
        });
    },
    sendMail() {
      var vm = this;
      this.$firebase
        .database()
        .ref("test/users/" + vm.recipient.author.id + "/mailbox")
        .push({
          title: vm.recipient.title,
          content: vm.content,
          time: Date.now(),
          sender: vm.$store.state.profile,
          category: vm.recipient.category,
          categoryType: vm.recipient.categoryType
        });
      this.$firebase
        .database()
        .ref("test/users/" + vm.$store.state.profile.id + "/mailbox")
        .push({
          title: vm.recipient.title,
          content: vm.content,
          time: Date.now(),
          sender: vm.$store.state.profile,
          category: vm.recipient.category,
          categoryType: vm.recipient.categoryType
        });
      this.$router.push("/mailbox");
    }
  },
  mounted() {
    this.getArticle();
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
    .title p {
      line-height: 1.8em;
      font-size: 1.8em;
    }
    .recipient,
    .mail-title,
    .mail-category,
    .mail-content {
      p {
        line-height: 1.6em;
        font-size: 1.6em;
      }
      input {
        width: 100%;
        line-height: 1.6em;
        font-size: 1.6em;
        border: none;
        background-color: $color-grey;
      }
      textarea {
        width: 100%;
        height: 180px;
        line-height: 1.6em;
        font-size: 1.6em;
        border: none;
        background-color: $color-grey;
        resize: none;
      }
    }
    .searchList {
      ul {
        li {
          list-style: none;
          line-height: 1.6em;
          font-size: 1.6em;
          border-left: 2px solid $color-kkbox-blue;
          cursor: pointer;
        }
      }
    }
    .mail-send {
      .send {
        width: 100%;
        background-color: $color-kkbox-grey;
        cursor: pointer;
        a {
          text-decoration: none;
          line-height: 1.6em;
          font-size: 1.6em;
          color: $color-white;
        }
      }
    }
    .modal-dialog {
      color: $color-ptt-black;
      .modal-body {
        line-height: 1.6em;
        font-size: 1.6em;
        background-color: $color-grey;
      }
    }
  }
}
</style>
