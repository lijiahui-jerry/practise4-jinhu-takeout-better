<template>
  <div class="shop-info">
    <div>
      <div class="info-block">
        <div class="info-title">配送信息</div>
        <div class="delivery">
          <div>
            <span class="logo" v-if="info.description">{{ info.description }}</span>
            <span>约{{ info.deliveryTime }}分钟送达，位于{{ info.distance }}</span>
          </div>
          <div class="fee">配送费{{ info.deliveryPrice }}元</div>
        </div>
      </div>

      <div class="split-bar"></div>

      <div class="info-block">
        <div class="info-title">活动与服务</div>
        <div class="activity">
          <div class="activity-item" v-for="(support, index) in info.supports" :key="index">
            <span class="tag-wrapper"> <span class="tag">&nbsp;{{ support.name }}&nbsp;</span></span>
            <span>{{ support.content }}</span>
          </div>
        </div>
      </div>

      <div class="split-bar"></div>

      <div class="info-block">
        <div class="info-title">商家实景</div>
        <div class="pics-wrapper">
          <ul class="pics" ref="pics">
            <li class="pic" v-for="(pic, index) in info.pics" :key="index">
              <img :src="pic"/>
            </li>
          </ul>
        </div>
      </div>

      <div class="split-bar"></div>

      <div class="info-block">
        <div class="info-title">商家信息</div>
        <ul class="details">
          <li><span class="bold">品类</span><span>{{ info.category }}</span></li>
          <li><span class="bold">商家电话</span><span>{{ info.phone }}</span></li>
          <li><span class="bold">地址</span><span>{{ info.address }}</span></li>
          <li><span class="bold">营业时间</span><span>{{ info.workTime }}</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import {mapState} from "vuex"
import BScroll from "better-scroll"

export default {
  name: "ShopInfo",
  mounted() {
    if (!this.info.pics) return
    this.newBScroll()
  },
  watch: {
    info() {
      this.$nextTick(() => {
        this.newBScroll()
      })
    },
  },
  methods: {
    newBScroll() {
      const liWidth = 120
      const liMarginRight = 6
      const picCount = this.info.pics.length

      this.$refs.pics.style.width =
          (liWidth + liMarginRight) * picCount - liMarginRight
          + 'px'

      new BScroll('.shop-info')
      new BScroll('.pics-wrapper', {scrollX: true})
    },
  },
  computed: {
    ...mapState({
      info: (state) => state.shop.info || {},
    }),
  },
}
</script>

<style scoped lang="less">
.shop-info {
  position: absolute;
  top: 200px;
  bottom: 0;
  left: 0;
  width: 100vw;
  overflow: hidden;

  .info-block {
    padding: 15px;
    border-bottom: 1px solid #EEEEEE;
    position: relative;

    .info-title {
      font-weight: 1000;
      font-size: 16px;
      line-height: 1em;
    }

    .delivery {
      margin-top: 15px;
      font-size: 14px;

      & .logo {
        width: 55px;
        font-size: 12px;
        line-height: 1.5em;
        margin-right: 5px;
        display: inline-block;
        text-align: center;
        color: #FFFFFF;
        background-color: #684E94;
        padding: 1px;
        border-radius: 3px;
      }

      & .fee {
        margin-top: 5px;
      }
    }

    .activity {
      margin-top: 16px;

      .activity-item {
        margin-bottom: 10px;
        display: flex;
        font-size: 14px;
        align-items: center;

        &:last-child {
          margin-bottom: 0;
        }

        .tag-wrapper {
          font-size: 14px;
          border-radius: 3px;
          height: 20px;
          margin-right: 10px;
          color: #FFFFFF;
          position: relative;
          background-color: #684E94;

          .tag {
            line-height: 20px;
          }
        }
      }
    }

    .pics-wrapper {
      margin-top: 14px;

      .pics {
        overflow: hidden;
        white-space: nowrap;
        font-size: 0;

        .pic {
          display: inline-block;
          margin-right: 8px;

          & > img {
            display: block;
            width: 120px;
            height: 90px;
          }

          &:last-child {
            margin-right: 0;
          }
        }
      }
    }

    .details {
      margin-bottom: -15px;

      & > li {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        line-height: 1em;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: rgba(0, 0, 0, .1);
          @media screen {
            @media (-webkit-device-pixel-ratio: 2) {
              transform: scaleY(.5);
            }
            @media (-webkit-device-pixel-ratio: 3) {
              transform: scaleY(.3);
            }
          }
        }

        &:last-child {
          &::after {
            height: 0;
          }
        }

        & > .bold {
          font-weight: 1000;
          font-size: 14px;
        }
      }
    }
  }

  .split-bar {
    width: 100%;
    height: 14px;
    border-top: 1px solid rgba(0, 0, 0, .1);
    border-bottom: 1px solid rgba(0, 0, 0, .1);
    background: #F3F5F7;
  }
}
</style>
