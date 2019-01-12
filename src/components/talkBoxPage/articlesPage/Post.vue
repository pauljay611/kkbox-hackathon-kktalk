<template>
  <div class="post">
    <div class="container">
      <div class="row">
        <div class="title col-md-12">
          <p class="text-center m-0">發表文章</p>
        </div>
        <div class="post-category col-md-12">
          <p class="m-0">分類</p>
          <input
            class="border rounded pl-3"
            type="text"
            placeholder="搜尋想討論的歌曲、專輯、歌手"
            @keyup.enter="search"
            v-model="keyword"
            :disabled="disabled"
          >
        </div>
        <div class="searchList col-md-12 mt-3" v-if="searchList.length > 0">
          <p>歌手</p>
          <ul class="p-0" v-if="searchList[0].artists.data!=undefined">
            <li
              class="pl-3 mt-1"
              v-for="(item,index) in searchList[0].artists.data"
              :key="index"
              @click="chooseCategory(item, '歌手')"
            >【{{item.name}}】</li>
          </ul>
          <p>歌曲</p>
          <ul class="p-0" v-if="searchList[0].tracks.data!=undefined">
            <li
              class="pl-3 mt-1"
              v-for="(item,index) in searchList[0].tracks.data"
              :key="index"
              @click="chooseCategory(item, '歌曲')"
            >【{{item.name}}】【{{item.album.artist.name}}】</li>
          </ul>
          <p>專輯</p>
          <ul class="p-0" v-if="searchList[0].albums.data!=undefined">
            <li
              class="pl-3 mt-1"
              v-for="(item,index) in searchList[0].albums.data"
              :key="index"
              @click="chooseCategory(item, '專輯')"
            >【{{item.name}}】【{{item.artist.name}}】</li>
          </ul>
        </div>
        <div class="post-title col-md-12 mt-3" v-if="disabled == 'disabled'">
          <p class="m-0">標題</p>
          <input class="border rounded pl-3" type="text" placeholder="輸入標題" v-model="title">
        </div>
        <div class="post-content col-md-12 mt-3" v-if="disabled == 'disabled'">
          <p class="m-0">內容</p>
          <textarea
            class="border rounded pl-3 content"
            type="text"
            placeholder="輸入內容"
            v-model="content"
          ></textarea>
        </div>
        <div class="post-send col-md-12 mt-2" v-if="disabled == 'disabled'">
          <div class="send rounded text-center" data-toggle="modal" data-target="#postModal">
            <a href="javascript:void(0)">發表</a>
          </div>
        </div>
        <div
          class="modal fade"
          id="postModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered" role="document">
            <div class="modal-content">
              <div class="modal-body">確認發表文章?</div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-dismiss="modal"
                  @click="postArticle"
                >發表</button>
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
  name: "post",
  data() {
    return {
      searchList: [],
      disabled: false,
      keyword: "",
      title: "",
      content: "",
      category: "",
      categoryType: ""
    };
  },
  methods: {
    async search() {
      this.searchList = [];
      let getSearchList = await this.$axios.get(
        `https://api.kkbox.com/v1.1/search?q=${
          this.keyword
        }&territory=TW&limit=5`,
        {
          headers: {
            Authorization: "Bearer " + this.$store.state.token
          }
        }
      );
      this.searchList.push(getSearchList.data);
    },
    chooseCategory(category, type) {
      this.keyword = category.name;
      if(type == '歌曲')category = category.album
      this.category = category;
      this.categoryType = type;
      this.disabled = "disabled";
      this.searchList = [];
    },
    postArticle() {
      if (this.keyword != "" && this.title != "" && this.content != "") {
        this.$firebase
          .database()
          .ref("articles")
          .push({
            categoryType: this.categoryType,
            author: this.$store.state.profile,
            postTime: Date.now(),
            category: this.category,
            title: this.title,
            content: this.content
          });
        this.$router.push("/articles");
      } else {
        alert("請填入標題與內容!");
      }
    }
  },
  mounted() {
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.post {
  color: $color-white;
  .container {
    padding: 0 5%;
    overflow: auto;
    height: 78vh;
    .title p {
      line-height: 1.8em;
      font-size: 1.8em;
    }
    .post-category,
    .post-title,
    .post-content {
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
        height: 300px;
        line-height: 1.6em;
        font-size: 1.6em;
        border: none;
        background-color: $color-grey;
        resize: none;
      }
    }
    .searchList {
      p {
        line-height: 1.6em;
        font-size: 1.6em;
        border-bottom: 1px solid $color-kkbox-blue;
      }
      ul {
        li {
          list-style: none;
          line-height: 1.4em;
          font-size: 1.4em;
          border-left: 2px solid $color-kkbox-blue;
          cursor: pointer;
        }
      }
    }
    .post-send {
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
