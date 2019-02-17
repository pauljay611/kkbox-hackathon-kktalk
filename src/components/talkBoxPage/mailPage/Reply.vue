<template>
  <div class="mail">
    <div class="container">
      <div
        v-if="recipient!=''"
        class="row"
      >
        <div class="title col-md-12">
          <p class="text-center m-0">
            回應信件
          </p>
        </div>
        <div class="recipient col-md-12">
          <p class="m-0">
            收件者
          </p>
          <input
            v-model="recipient.sender.name"
            class="border rounded pl-3"
            type="text"
            placeholder="作者"
            disabled="disabled"
          >
        </div>
        <div class="mail-category col-md-12 mt-3">
          <p class="m-0">
            分類
          </p>
          <input
            v-model="recipient.category.name"
            class="border rounded pl-3"
            type="text"
            placeholder="輸入分類"
            disabled="disabled"
          >
        </div>
        <div class="mail-title col-md-12 mt-3">
          <p class="m-0">
            標題
          </p>
          <input
            v-model="recipient.title"
            class="border rounded pl-3"
            type="text"
            placeholder="輸入標題"
            disabled="disabled"
          >
        </div>
        <div class="mail-content col-md-12 mt-3">
          <p class="m-0">
            內容
          </p>
          <textarea
            v-model="content"
            class="border rounded pl-3 content"
            type="text"
            placeholder="輸入內容"
          />
        </div>
        <div class="mail-send col-md-12 mt-2">
          <div
            class="send rounded text-center"
            data-toggle="modal"
            data-target="#mailModal"
          >
            <a href="javascript:void(0)">
              發送
            </a>
          </div>
        </div>
        <div
          id="mailModal"
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
              <div class="modal-body">
                確認發送信件?
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
                  @click="sendMail"
                >
                  發送
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// import modal from "@/components/modal/Modal";
export default {
  name: "Mail",
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
  mounted() {
    this.getMail();
  },
  methods: {
    getMail() {
      var vm = this;
      this.$firebase
        .database()
        .ref(
          `${process.env.NODE_ENV}/users/` +
            this.$store.state.profile.id +
            "/mailbox/" +
            this.$route.params.id
        )
        .once("value")
        .then(function(snapshot) {
          vm.recipient = snapshot.val();
        });
    },
    sendMail() {
      var vm = this;
      var reString = "(RE) ";
      if (vm.recipient.title.indexOf("RE") >= 0) reString = "";
      this.$firebase
        .database()
        .ref(
          `${process.env.NODE_ENV}/users/` + vm.recipient.sender.id + "/mailbox"
        )
        .push({
          title: reString + vm.recipient.title,
          content: vm.content,
          time: Date.now(),
          sender: vm.$store.state.profile,
          category: vm.recipient.category,
          categoryType: vm.recipient.categoryType
        });
      this.$firebase
        .database()
        .ref(
          `${process.env.NODE_ENV}/users/` +
            vm.$store.state.profile.id +
            "/mailbox"
        )
        .push({
          title: reString + vm.recipient.title,
          content: vm.content,
          time: Date.now(),
          sender: vm.$store.state.profile,
          category: vm.recipient.category,
          categoryType: vm.recipient.categoryType
        });
      this.$router.push("/mailbox");
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.mail {
  color: $color-white;
  overflow: auto;
  .container {
    padding: 0 5%;
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
        height: 130px;
        line-height: 1.6em;
        font-size: 1.6em;
        border: none;
        background-color: $color-grey;
        resize: none;
      }
    }
    .searchList {
      ul {
        max-height: 350px;
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
