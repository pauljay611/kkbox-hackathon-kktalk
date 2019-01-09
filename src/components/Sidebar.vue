<template>
  <div class="sidebar col-md-2">
    <div class="sidebar-logo text-center m-3">
      <img
        src="http://fakeimg.pl/100x100/"
        @click="change"
        class="img-fluid rounded-circle"
        alt="Responsive image"
      >
    </div>
    <div class="sidebar-nav">
      <ul>
        <li>
          <router-link to="/explorer" class="nav-item" :class="{ 'active': linkActive.explorer}">
            <md-icon class="mr-1">search</md-icon>
            <span>Explorer</span>
          </router-link>
        </li>
        <li>
          <router-link to="/home" class="nav-item" :class="{ 'active': linkActive.home}">
            <md-icon class="mr-1">home</md-icon>
            <span>Home page</span>
          </router-link>
        </li>
        <li>
          <router-link to="/chat" class="nav-item" :class="{ 'active': linkActive.chat}">
            <md-icon class="mr-1">chat</md-icon>
            <span>Chat</span>
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sidebar",
  data() {
    return {
      linkActive: {}
    };
  },
  methods: {
    change(item) {
      this.linkActive = item;
    }
  },
  mounted() {
    var vm = this;
    this.$bus.$on("active", function(item) {
        vm.change(item)
    });
  },
  beforeDestroy: function() {
    this.$bus.$off("active");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
$color-dark-blue: #135ca4;
$color-kkbox-blue: #00aed8;
$color-white: #ffffff;
$color-grey: #5f5d5d;
.sidebar {
  height: 800px;
  padding: 0 2%;
  box-shadow: 0px 0px 15px $color-grey;
  background-color: $color-white;
  ul li {
    list-style: none;
    .nav-item {
      color: $color-grey;
      font-size: 1.5em;
      line-height: 1.8;
      text-decoration: none;
      &:hover,
      :active {
        color: $color-dark-blue;
      }
    }
    .active {
      color: $color-dark-blue;
    }
  }
}
</style>
