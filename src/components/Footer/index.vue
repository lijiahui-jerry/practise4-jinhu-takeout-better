<template>
  <!-- 底部栏 -->
  <div class="container">
    <div class="row">
      <div class="col-xs-3" @click="routerGo('home')" :class="{active:pageFlag('home')}">
        <i class="iconfont icon-shouye"></i>
        <span>首页</span>
      </div>
      <div class="col-xs-3" @click="routerGo('search')" :class="{active:pageFlag('search')}">
        <i class="iconfont icon-sousuo"></i>
        <span>觅食</span>
      </div>
      <div class="col-xs-3" @click="routerGo('order')" :class="{active:pageFlag('order')}">
        <i class="iconfont icon-dingdan"></i>
        <span>订单</span>
      </div>
      <div class="col-xs-3" @click="routerGo('me')" :class="{active:pageFlag('me')}">
        <i class="iconfont icon-sharpicons_Wolf"></i>
        <span>我</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Footer",
  methods: {
    //判断当前页，控制active样式
    pageFlag(path) {
      return this.$route.path.indexOf(path) == 1
    },
    //路由跳转
    routerGo(path) {
      this.$router.push(path)
    },
  },
}
</script>

<style scoped lang="less">
.container {
  margin: 0;
  padding: 0;
  background-color: #FFFFFF;
  height: 50px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;

  //底部导航栏上方的1px细线
  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 1px;
    background-color: #E4E4E4;
    @media screen {
      @media (-webkit-device-pixel-ratio: 2) {
        transform: scaleY(0.5);
      }
      @media (-webkit-device-pixel-ratio: 3) {
        transform: scaleY(0.3);
      }
    }
  }

  .col-xs-3 {
    padding: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: baseline;
    color: #999999;
    //当前页的标识
    &.active {
      color: #9254DE;
    }

    .iconfont {
      font-size: 22px;
      line-height: 1.2em;
      margin-top: .2em;
    }

    span {
      font-size: 14px;
      line-height: 1em;
    }
  }
}
</style>
