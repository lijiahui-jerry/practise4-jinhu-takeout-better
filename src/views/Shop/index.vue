<template>
  <div class="shop-main">
    <ShopHeader></ShopHeader>
    <!-- 干饭、评价、商家 -->
    <div class="nav-bar">
      <div class="bar" :class="ifActive('goods')?'bar-active':''" @click="$router.replace('/shop/goods')">干饭</div>
      <div class="bar" :class="ifActive('ratings')?'bar-active':''" @click="$router.replace('/shop/ratings')">评价</div>
      <div class="bar" :class="ifActive('info')?'bar-active':''" @click="$router.replace('/shop/info')">商家</div>
    </div>
    <!-- 路由缓存，避免频繁加载及购买数量bug -->
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
import ShopHeader from "@/components/ShopHeader"
import ShopGoods from "./ShopGoods"
import ShopInfo from "./ShopInfo"
import ShopRatings from "./ShopRatings"

export default {
  name: "Shop",
  mounted() {
    this.$store.dispatch('getShopDetail', 'getShopRatings')
  },
  methods: {
    //通过url判断当前哪个bar该active
    ifActive(path) {
      return -1 != this.$route.path.indexOf(path) ? true : false
    },
  },
  components: {ShopHeader, ShopGoods, ShopInfo, ShopRatings},
}
</script>

<style scoped lang="less">
.shop-main {
  width: 100vw;
  height: 100vh;
  position: relative;

  .nav-bar {
    height: 40px;
    width: 100%;
    background: #FFFFFF;
    display: flex;
    position: relative;

    &::before {
      content: '';
      position: absolute;
      top: 4px;
      left: 0;
      right: 0;
      background-color: rgba(0, 0, 0, .1);
      height: 1px;
      @media screen {
        @media (-webkit-device-pixel-ratio: 2) {
          transform: scaleY(0.5);
        }
        @media (-webkit-device-pixel-ratio: 3) {
          transform: scaleY(0.3);
        }
      }
    }

    .bar {
      flex-grow: 1;
      align-self: center;
      position: relative;
      text-align: center;
      font-size: 18px;

      &.bar-active {
        color: #684E94;

        &::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 2px;
          background: #684E94;
        }
      }
    }
  }
}
</style>
