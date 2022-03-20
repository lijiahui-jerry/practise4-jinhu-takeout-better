<template>
  <div class="shop-header">
    <div class="header-background" :style="{backgroundImage:`url(${info.bgImg})`}">
      <div class="back" @click="$router.back()"><i class="iconfont icon-fanhui"></i></div>
    </div>
    <div class="brief">
      <div class="avatar">
        <img v-lazy="info.avatar">
      </div>
      <div class="brief-content">
        <h2 class="shop-name">{{ info.name }}</h2>
        <div class="sell">
          <span class="sell-detail">{{ info.score }}</span>
          <span class="sell-detail">月均{{ info.sellCount }}单</span>
          <span class="sell-detail">人均{{ info.sellCount }}元</span>
          <span class="sell-detail">{{ info.distance }}</span>
        </div>
      </div>
    </div>
    <div class="discount shrink" v-if="ifShowDetail()&&ifDetailShrink" @click="toggleDetaiShowType()">
      <div class="discount-left">
        <div class="activity">
          <span class="activity-tag">{{ info.supports[0].name }}</span>
          <span class="activity-detail">{{ info.supports[0].content }}</span>
        </div>
      </div>
      <div class="discount-right" v-if="ifShowDetail()">
        <span class="discount-count">{{ ifShowDetail() }}个优惠</span>
      </div>
    </div>
    <div class="discount stretch" v-if="ifShowDetail()&&(!ifDetailShrink)" @click="toggleDetaiShowType()">
      <div class="discount-left" v-for="(support,index) in info.supports" :key="index">
        <div class="activity">
          <span class="activity-tag">{{ support.name }}</span>
          <span class="activity-detail">{{ support.content }}</span>
        </div>
      </div>
      <div class="discount-right" v-if="ifShowDetail()">
        <span class="discount-count">{{ ifShowDetail() }}个优惠</span>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"

export default {
  name: "ShopHeader",
  data() {
    return {
      ifDetailShrink: true,
    }
  },
  computed: {
    ...mapState({
      info: (state) => state.shop.info || {},
    }),
  },
  methods: {
    //判断是否有优惠信息并显示有几个优惠
    ifShowDetail() {
      if (this.info.supports && this.$route.path.indexOf('shop/goods') != -1) return this.info.supports.length
      return false
    },
    //切换优惠显示的形式，缩略或完整
    toggleDetaiShowType() {
      this.ifDetailShrink = !this.ifDetailShrink
    },
  },
}
</script>

<style scoped lang="less">
.shop-header {
  background: #FFFFFF;
  overflow: hidden;
  text-align: center;

  .header-background {
    background-size: cover;
    background-repeat: no-repeat;
    position: relative;
    height: 70px;

    //返回按钮
    .back {
      padding-left: 5px;
      position: relative;
      color: #FFFFFF;
      width: 40px;
      height: 100%;

      //返回按钮的透明背景色
      &::after {
        content: "";
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background-color: rgba(255, 255, 255, .2);
      }

      .iconfont {
        font-size: 40px;
        line-height: 2em;
      }
    }
  }

  .brief {
    position: relative;
    background: #FFFFFF;
    text-align: center;
    display: flex;

    //商家头像的盒子
    .avatar {
      position: absolute;
      top: -36px;
      left: 50%;
      transform: translateX(-50%);
      width: 66px;
      height: 66px;
      border-radius: 4px;
      overflow: hidden;

      & > img {
        width: 100%;
      }
    }

    .brief-content {
      width: 100%;
      margin-top: 31px;

      & > h2 {
        font-size: 20px;
        line-height: 24px;
        font-weight: 1000;
      }

      .sell {
        display: flex;
        width: 70%;
        margin: 5px auto 0;
        font-size: 14px;

        .sell-detail {
          flex-grow: 1;
        }
      }
    }
  }

  /*
   * 2022-01-22 ljh
   * discount类css需要优化
   */

  .discount {
    //折叠时的样式
    &.shrink {
      width: 90%;
      display: flex;
      margin: 5px auto;
      font-size: 12px;
      border: 1px solid #E7DDB8;
      padding: 2px;
      border-radius: 4px;

      //活动的标签和具体信息
      .discount-left {
        flex: 1;
        overflow: hidden;

        .activity {
          display: flex;
          align-items: center;

          //活动的简称tag的内容
          .activity-tag {
            border-radius: 4px;
            padding: 3px 4px 4px;
            background-color: #684E94;
            color: #FFFFFF;
            font-weight: 1000;
            transform: scale(.8);
          }
        }
      }

      .discount-right {
        width: 80px;
        flex-shrink: 0;
        padding-right: 10px;
        position: relative;

        .discount-count {
          position: absolute;
          right: 10px;
          margin-top: 3px;
          text-align: right;
        }

        //css实现倒三角表示点击显示更多
        &::after {
          content: '';
          display: block;
          border-style: solid;
          border-width: 4px 4px 0;
          border-color: rgba(0, 0, 0, .5) transparent transparent;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          right: 1px;
        }
      }
    }

    //展开时的样式
    &.stretch {
      width: 90%;
      display: flex;
      flex-direction: column;
      margin: 5px auto;
      font-size: 12px;
      border: 1px solid #E7DDB8;
      padding: 2px;
      border-radius: 4px;
      position: relative;
      z-index: 50;
      background-color: #FFFFFF;

      //活动的标签和具体信息
      .discount-left {
        flex: 1;
        overflow: hidden;

        .activity {
          display: flex;
          align-items: center;

          //活动的简称tag的内容
          .activity-tag {
            border-radius: 4px;
            padding: 3px 4px 4px;
            background-color: #684E94;
            color: #FFFFFF;
            font-weight: 1000;
            transform: scale(.8);
          }
        }
      }

      .discount-right {
        width: 80px;
        padding-right: 10px;
        position: absolute;
        top: 2px;
        right: 2px;

        .discount-count {
          position: absolute;
          right: 10px;
          margin-top: 3px;
          text-align: right;
        }

        //css实现正三角表示点击隐藏详细优惠信息
        &::after {
          content: '';
          display: block;
          border-style: solid;
          border-width: 0 4px 4px;
          border-color: transparent transparent rgba(0, 0, 0, .5);
          position: absolute;
          right: 1px;
          top: 5px;
        }
      }
    }
  }
}
</style>
