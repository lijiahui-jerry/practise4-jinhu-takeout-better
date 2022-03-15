<template>
  <!-- 首页头部 -->
  <header>
    <div class="header-left" v-if="left">
      <i class="iconfont icon-shouye back-to-home" @click="$router.replace('home')"></i>
    </div>
    <span class="title-container">
   <span class="title-content">{{ title }}</span>
  </span>
    <div @click="routerGo('login')" class="header-right" v-if="right"><span class="c">登录</span></div>
  </header>
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
header {
  position: relative;
  background-color: #684E94;
  height: 45px;

  //顶部中间的文字
  .title-container {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 50%;
    color: #FFFFFF;
    text-align: center;

    .title-content {
      font-size: 20px;
      color: #FFFFFF;
    }
  }

  //左上角返回主页按钮
  .header-left {
    position: absolute;
    left: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 10%;
    height: 50%;

    & .back-to-home {
      display: block;
      font-size: 25px;
      color: #FFFFFF;
    }
  }

  //右上角登录
  .header-right {
    font-size: 14px;
    color: #FFFFFF;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);

    .login {
      color: #FFFFFF;
    }
  }
}
</style>
