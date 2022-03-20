<template>
  <!-- 首页头部 -->
  <div class="row header-main">
    <div class="col-xs-2 header-left">
      <i class="iconfont icon-shouye back-to-home" @click="$router.replace('home')" v-if="left"></i>
    </div>
    <div class="col-xs-8 header-middle">{{ title }}</div>
    <div class="col-xs-2 header-right">
      <span class="header-right" @click="routerGo('login')" v-if="right">登录</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
    left: false,
    right: false,
  },
  methods: {
    //路由跳转
    routerGo(path) {
      this.$router.push(path)
    },
  },

}
</script>

<style scoped lang="less">
.header-main {
  height: 45px;
  line-height: 45px;
  text-align: center;
  background-color: #684E94;
  color: #FFFFFF;

  &::after {
    width: 100%;
    height: 1px;
    background-color: black;
  }

  .header-left {
    .back-to-home {
      display: block;
      font-size: 25px;
    }
  }

  .header-middle {
    font-size: 20px;
  }

  .header-right {
    display: block;
    font-size: 12px;
  }
}
</style>
