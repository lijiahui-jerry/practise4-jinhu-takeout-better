<template>
  <div>
    <Header :title="school.name" :right=!ifLogged()></Header>
    <div class="home-main">
      <Navigation class="my-navigation"></Navigation>
      <ShopList class="my-shop-list"></ShopList>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import ShopList from "./ShopList"
import Navigation from "./Navigation"
import {mapState} from "vuex"

export default {
  name: "Home",
  components: {Header, ShopList, Navigation},
  mounted() {
    this.$store.dispatch('getLocation')
    this.$store.dispatch("getNavigation")
    this.$store.dispatch("getShops")
  },
  computed: {
    ...mapState({
      school: (state) => state.home.school || {},
    }),
  },
  methods: {
    //判断是否已经登录，用于决定header的右侧“登录”要不要显示
    ifLogged() {
      return localStorage.getItem('token')
    },
  },
}
</script>

<style scoped lang="less">
.home-main {
  position: absolute;
  top: 45px;
  left: 0;
  right: 0;
  bottom: 0;

  .my-navigation {
    position: absolute;
    top: 0;
    height: 220px;
    left: 0;
    right: 0;
  }

  .my-shop-list {
    position: absolute;
    top: 220px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
}
</style>
