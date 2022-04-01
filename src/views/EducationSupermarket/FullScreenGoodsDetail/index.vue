<template>
  <transition name="fade">
    <div class="food" v-if="ifShow">
      <!-- 餐品详情 -->
      <div class="content">
        <!-- 上半部分 -->
        <div class="up">
          <!-- 餐品照片 -->
          <img v-lazy="good.image">
        </div>
        <!-- 下半部分 -->
        <div class="down">
          <span class="food-name">{{ good.name }}</span>
          <!-- 餐品用料 -->
          <p class="components">{{ good.info }}</p>
          <div class="sells-detail">
            <span class="counts">月售{{ good.sellCount }}份&nbsp;</span>
            <span class="rating">好评{{ good.rating }}%</span>
          </div>
          <div class="price">
            <span class="new">￥{{ good.price }}</span>
          </div>
          <CartControl2 class="cart-control" :good="good"/>
        </div>
      </div>
      <!-- 遮罩 -->
      <div class="cover" @click="toggleIfShow()"></div>
    </div>
  </transition>
</template>

<script>
import CartControl2 from "../CartControl2"

export default {
  name: "FullScreenGoodsDetail",
  components: {CartControl2},
  props: {
    good: Object,
  },
  data() {
    return {
      ifShow: false,
    }
  },
  methods: {
    //切换此组件显示状态
    toggleIfShow() {
      this.ifShow = !this.ifShow
    },
  },
}
</script>

<style scoped lang="less">
.food {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 50;
  backdrop-filter: blur(10px);

  .content {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 80%;
    height: 60%;
    z-index: 51;
    background: #FFFFFF;
    border-radius: 10px;
    overflow: hidden;

    .up {
      position: relative;
      width: 100%;
      height: 60%;

      img {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }

    .down {
      position: relative;
      padding: 24px;
      height: 40%;

      .food-name {
        line-height: 18px;
        margin-bottom: 10px;
        font-size: 18px;
        font-weight: 1000;
      }

      .components {
        font-size: 12px;
        color: #999999;
      }

      .sells-detail {
        margin: 10px 0;
        font-size: 14px;
        color: #999999;
      }

      .price {
        font-weight: 1000;
        position: absolute;
        left: 10%;
        bottom: 10%;

        .new {
          margin-left: 8px;
          font-size: 30px;
          color: red;
        }

        .old {
          text-decoration: line-through;
          font-size: 12px;
          color: gray;
        }
      }

      .cart-control {
        position: absolute;
        right: 5%;
        bottom: 5%;
      }
    }
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: all .3s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: rgb(0, 0, 0);
  }

  //遮罩
  .cover {
    position: fixed;
    top: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, .7);
  }

  &.fade-enter-active, &.fade-leave-active {
    transition: all .3s;
  }

  &.fade-enter, &.fade-leave-to {
    opacity: 0;
    background: #000000;
  }
}
</style>
