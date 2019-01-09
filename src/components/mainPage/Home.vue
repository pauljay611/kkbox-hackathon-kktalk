<template>
  <div class="home">
    <div class="header d-flex justify-content-between">
      <div class="header-search m-0 d-flex align-items-center">
        <input type="text" placeholder="13245" class="border rounded">
        <md-icon>search</md-icon>
      </div>
      <div class="header-profile d-flex justify-content-center align-items-center">
        <div class="profilePhoto">
          <img src="http://fakeimg.pl/50x50/" class="img-fluid rounded-circle">
        </div>
        <div class="profileUser">
          <h4 class="mb-0">12345</h4>
          <p class="mb-0">67891</p>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-title">Recently Play</div>
      <div class="cardList row">
        <div class="cardList-item col-md-2" v-for="(item, index) in playList" :key="index">
          <img src="http://fakeimg.pl/300x250/" class="img-fluid rounded">
          <div class="cardTitle">
            <h4>12345</h4>
            <p>67891</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="content-title">Recommend</div>
      <div class="cardList row">
        <div class="cardList-item col-md-2" v-for="(item, index) in playList" :key="index">
          <img src="http://fakeimg.pl/300x250/" class="img-fluid rounded">
          <div class="cardTitle">
            <h4>12345</h4>
            <p>67891</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      playList: [1, 2, 3, 4, 5]
    };
  },
  mounted(){
    this.$bus.$emit('active', {
      home: true,
      explorer: false,
      chat: false,
    })
  }
};
</script>
<style lang="scss" scoped>
.header .header-search {
  position: relative;
  width: 30%;
  margin: 1%;
  input {
    padding: 1%;
    width: 100%;
    height: 50%;
    border:none;
  }
  .md-icon {
    position: absolute;
    right:3%;
    z-index:1;
    color: #c2bdbd;
    cursor: pointer;
  }
}
.header .header-profile {
  width: 20%;
  margin: 1%;
  .profilePhoto,
  .profileUser {
    margin: 0 2%;
  }
}
.content {
  margin-top: 5%;
  .content-title {
    font-size: 1.8em;
    margin: 1% 0;
  }
  .cardList .cardList-item {
    margin: 1% 0;
    img {
      box-shadow: 0px 0px 15px #c2bdbd;
    }
    .itemTitle {
      margin: 2% 0;
    }
  }
}
</style>
