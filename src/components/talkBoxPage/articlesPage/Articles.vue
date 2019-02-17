<template>
  <div class="articles">
    <div class="container">
      <div
        v-if="articlesList.length>0"
        class="row"
      >
        <div class="searchInput col-md-12 mt-3 pl-3">
          <input
            v-model="keyword"
            type="text"
            placeholder="搜尋文章..."
            @keyup.enter="search"
          >
        </div>
        <div
          v-for="(item, index) in articlesList"
          :key="index"
          class="articles-content col-md-12 mt-3 p-0"
        >
          <div
            class="articles-number text-right p-0"
            :class="commentCount(item.comment).color"
          >
            {{ commentCount(item.comment).number }}
          </div>
          <div class="articles-main pl-2">
            <div class="articles-category">
              <router-link :to="'/articles/'+item.id">
                【 {{ item.categoryType }} 】【 {{ item.category.name }} 】
              </router-link>
            </div>
            <div class="articles-title">
              <router-link :to="'/articles/'+item.id">
                {{ item.title }}
              </router-link>
            </div>
            <div class="articles-info pr-2">
              <router-link :to="'/profile/'+item.author.id">
                {{ item.author.name }}
              </router-link>
              <p class="date m-0">
                {{ item.postTime | moment("MM/DD") }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="commentBar col-md-12 text-center">
      <div class="postBtn">
        <router-link to="/post">
          <md-icon>create</md-icon>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Articles",
  data() {
    return {
      articlesList: [],
      keyword: ""
    };
  },
  mounted() {
    var vm = this;
    vm.articlesList = [];
    // this.$bus.$emit("active", {
    //   url: "/articles",
    //   name: "所有文章"
    // });
    this.$emit("handle", { url: "/articles", name: "所有文章" });
    this.$firebase
      .database()
      .ref(`${process.env.NODE_ENV}/articles`)
      .once("value")
      .then(function(snapshot) {
        let articles = snapshot.val();
        for (let item in articles) {
          articles[item].id = item;
          vm.articlesList.push(articles[item]);
        }
      });
  },
  methods: {
    commentCount(comment) {
      let count = {
        number: 0,
        color: ""
      };
      for (let item in comment) {
        if (comment[item].type == "thumb_up") {
          count.number++;
        } else if (comment[item].type == "thumb_down") {
          count.number--;
        }
      }
      if (count.number > 0 && count.number < 100) {
        count.color = "thumb_up";
      } else if (count.number > -10) {
        count.number = "";
        count.color = "common";
      } else if (count.number <= -10) {
        count.number = "X" + -(count.number / 10).toFixed(0);
        count.color = "common_grey";
      } else if (count.number >= 100) {
        count.number = "爆";
        count.color = "thumb_down";
      }
      return count;
    },
    search() {
      var vm = this;
      vm.articlesList = [];
      this.$firebase
        .database()
        .ref(`${process.env.NODE_ENV}/articles`)
        .once("value")
        .then(function(snapshot) {
          let articles = snapshot.val();
          for (let item in articles) {
            if (
              articles[item].title.indexOf(vm.keyword) >= 0 ||
              articles[item].category.name.indexOf(vm.keyword) >= 0
            ) {
              articles[item].id = item;
              vm.articlesList.push(articles[item]);
            }
          }
        });
    }
  }
};
</script>
<style lang="scss" scoped>
@import "@/assets/css/base.scss";
.articles {
  color: $color-white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .container {
    height: 78vh;
    padding: 0 5%;
    overflow: auto;
    .searchInput {
      background-color: #222222;
      input {
        width: 100%;
        line-height: 1.6em;
        font-size: 1.6em;
        border: none;
        color: $color-white;
        background-color: #222222;
      }
    }
    .articles-content {
      display: flex;
      background-color: $color-ptt-grey;
      line-height: 1.4em;
      font-size: 1.4em;
      cursor: pointer;
      .articles-number {
        width: 5%;
      }
      .articles-main {
        width: 95%;
        a {
          color: $color-white;
        }
        .articles-info {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .commentBar {
    display: flex;
    justify-content: center;
    color: $color-grey;
    padding: 0% 3%;
    line-height: 1.6em;
    font-size: 1.6em;
    cursor: pointer;
    text-decoration: none;
    .postBtn {
      width: 100%;
      background-color: $color-ptt-blue;
      a {
        display: block;
        background-color: $color-ptt-blue;
        color: $color-grey;
        &:hover {
          text-decoration: none;
        }
      }
    }
  }
}
</style>
