<template>
  <div class="shop-ratings">
    <!-- 商家总体评价 -->
    <div class="brief">
      <div class="left">
        <div class="value">{{ info.score }}</div>
        <div class="key">综合评分</div>
      </div>
      <div class="right">
        <div class="service">
          <div class="key">服务态度</div>
          <Star :rating="info.serviceScore" size="36"></Star>
          <div class="value">{{ info.serviceScore }}</div>
        </div>
        <div class="commodity">
          <div class="key">商品评分</div>
          <Star :rating="info.foodScore" size="36"></Star>
          <div class="value">{{ info.foodScore }}</div>
        </div>
        <div class="delivery">
          <span class="key">平均送达时间</span>
          <span class="value">{{ info.deliveryTime }}分钟</span>
        </div>
      </div>
    </div>

    <div class="split-bar"></div>

    <div class="filtered-ratings">
      <div class="rating-type">
        <div class="choice" :class="{active: 2==showRatingType}"
             @click="toggleRatingType(2)">
          差评{{ thumbsDownCount }}
        </div>
        <div class="choice" :class="{active: 0==showRatingType}"
             @click="toggleRatingType(0)">
          全部{{ ratings.length }}
        </div>
        <div class="choice" :class="{active: 1==showRatingType}"
             @click="toggleRatingType(1)">
          好评{{ thumbsUpCount }}
        </div>
      </div>

      <div class="toggle" :class="{active: ifShowRatingsWithContent}"
           @click="toggleIfShowRatingsWithContent()">
        <span>只看有内容的评价</span>
        <i class="iconfont icon-dagou"></i>
      </div>


    </div>
    <div class="ratings-wrapper" ref="shopRatings">
      <ul class="rating-ul">
        <!-- 具体评价 -->
        <li class="rating-li" v-for="(rating, index) in filteredRatings"
            :key="index">
          <div class="avatar">
            <img :src="rating.avatar">
          </div>
          <div class="rating-content">
            <div class="user-name">{{ rating.username }}</div>
            <Star class="star" :rating="rating.score" size="24"/>
            <div class="delivery-time">{{ rating.deliveryTime }}分钟送达</div>
            <div class="rating-text">{{ rating.text }}</div>
            <div class="recommend">
              <i class="iconfont"
                 :class="rating.thumbsUp ?
           'icon-zan' : 'icon-cai'"></i>
              <span class="recommend-item" v-for="(item, index) in rating.recommend"
                    :key="index">{{ item }}</span>
            </div>
            <div class="rating-time">{{ rating.rateTime|dateFormat }}</div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
import Star from "@/components/Star"
import {mapState, mapGetters} from "vuex"
import BScroll from "better-scroll"

export default {
  name: "ShopRatings",
  data() {
    return {
      ifShowRatingsWithContent: true,
      //要看的评价类型：0为全部，1为好评，2为差评
      showRatingType: 0,
    }
  },
  methods: {
    //切换查看的评价类型
    toggleRatingType(type) {
      this.showRatingType = type
      /* 此处必须借助nextTick，使refresh在等待DOM加载完成后进行，
         直接refresh的话会因为DOM没有加载完成而报错 */
      this.$nextTick(() => {
        this.bscroll.refresh()
      })
    },
    //切换是否只看有内容的评价
    toggleIfShowRatingsWithContent() {
      this.ifShowRatingsWithContent = !this.ifShowRatingsWithContent
      this.$nextTick(() => {
        this.bscroll.refresh()
      })
    },
  },
  mounted() {
    this.$store.dispatch('getShopRatings', () => {
      this.$nextTick(() => {
        this.bscroll = new BScroll(this.$refs.shopRatings, {click: true})
      })
    })
  },
  computed: {
    //过滤评价数组
    filteredRatings() {
      const {ratings, ifShowRatingsWithContent, showRatingType} = this
      if (ifShowRatingsWithContent && 1 == showRatingType) {
        //好评且有评论内容的
        return ratings.filter((rating) => rating.text.length > 0 && rating.thumbsUp)
      } else if (ifShowRatingsWithContent && 2 == showRatingType) {
        //差评且有评论内容的
        return ratings.filter((rating) => rating.text.length > 0 && !rating.thumbsUp)
      } else if (!ifShowRatingsWithContent && 1 == showRatingType) {
        //好评但没评论内容的
        return ratings.filter((rating) => rating.thumbsUp)
      } else if (!ifShowRatingsWithContent && 2 == showRatingType) {
        //差评但没评论内容的
        return ratings.filter((rating) => !rating.thumbsUp)
      } else if (ifShowRatingsWithContent && 0 == showRatingType) {
        //全部有评论内容的
        return ratings.filter((rating) => rating.text.length > 0)
      } else {
        //全部评论
        return ratings
      }
    },
    //根据评论数及好评数计算差评数
    thumbsDownCount() {
      return this.ratings.length - this.thumbsUpCount
    },
    ...mapState({
      info: (state) => state.shop.info || {},
      ratings: (state) => state.shop.ratings || [],
    }),
    ...mapGetters(['thumbsUpCount']),
  },
  components: {Star},
}
</script>

<style scoped lang="less">
.shop-ratings {
  position: absolute;
  top: 205px;
  bottom: 0;
  left: 0;
  right: 0;

  .brief {
    display: flex;
    padding: 15px 0;

    .left {
      flex: 0 0 120px;
      padding-top: 10px;
      width: 120px;
      border-right: 1px solid rgba(0, 0, 0, .1);
      text-align: center;

      & > .key {
        font-size: 12px;
        line-height: 1em;
        height: 1em;
      }

      & > .value {
        line-height: 1em;
        height: 1em;
        font-size: 30px;
        margin-bottom: 10px;
        color: #684E94;
      }
    }

    .right {
      padding: 5px 0 5px 40px;

      .service, .commodity {
        height: 20px;
        line-height: 12px;

        .key {
          float: left;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          margin-right: 10px;
        }

        .star {
          float: left;
          margin: 2px 10px 0 0;
        }

        .value {
          float: left;
          font-size: 12px;
          height: 20px;
          line-height: 20px;
          color: #684E94;
        }
      }

      .delivery {
        float: left;

        & > .key {
          line-height: 20px;
          font-size: 12px;
        }

        & > .value {
          margin-left: 10px;
          font-size: 12px;
          color: #684E94;
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

  .filtered-ratings {
    .rating-type {
      display: flex;
      padding: 10px 20px;

      .choice {
        flex: 1 0 20px;
        font-size: 12px;
        padding: 8px 14px;
        width: 20px;
        margin: 0 20px;
        line-height: 16px;
        border-radius: 5px;
        background: rgba(77, 85, 93, .2);
        text-align: center;

        &.active {
          background: #684E94;
          color: #FFFFFF;
        }

        & > span {
          margin-left: 3px;
          font-size: 12px;
        }
      }
    }

    .toggle {
      padding-right: 20px;
      line-height: 24px;
      height: 24px;
      border-bottom: 1px solid rgba(0, 0, 0, .1);
      color: rgb(147, 153, 159);
      text-align: right;

      & > .iconfont {
        margin-left: 4px;
        font-size: 16px;
      }

      & > span {
        font-size: 12px;
      }

      &.active {
        & > .iconfont {
          color: #684E94;
        }
      }
    }
  }

  .ratings-wrapper {
    position: absolute;
    top: 200px;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 0 20px;
    overflow: hidden;

    //所有用户的评价
    .rating-ul {

      //单个用户的评价
      .rating-li {
        display: flex;
        padding: 15px 0;
        position: relative;

        &::after {
          content: '';
          display: block;
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 1px;
          background-color: rgba(0, 0, 0, .1);
          @media screen {
            @media (-webkit-device-pixel-ratio: 2) {
              transform: scaleY(0.5);
            }
            @media (-webkit-device-pixel-ratio: 3) {
              transform: scaleY(0.3);
            }
          }
        }

        .avatar {
          flex: 0 0 30px;
          width: 30px;

          & > img {
            width: 30px;
            height: 30px;
            border: none;
            border-radius: 50%;
          }
        }

        .rating-content {
          position: relative;
          flex: 1;
          width: 100%;
          margin-left: 10px;

          .user-name {
            line-height: 12px;
            font-size: 12px;
          }

          .star {
            margin-top: 4px;
            display: inline-block;
          }

          .delivery-time {
            float: right;
            margin-top: 5px;
            display: inline-block;
            line-height: 12px;
            font-size: 12px;
            color: #999999;
          }

          .rating-text {
            width: 100%;
            font-size: 12px;
            display: inline-block;
            margin-top: 4px;
            line-height: 16px;
          }

          .recommend {
            line-height: 16px;

            & .iconfont, .recommend-item {
              display: inline-block;
              margin: 4px;
              font-size: 12px;
            }

            .icon-zan {
              color: #684E94;
            }

            .icon-cai {
              color: #555555;
            }

            .recommend-item {
              padding: 1px 5px;
              @media screen {
                @media (-webkit-device-pixel-ratio: 2) {
                  border: .5px solid rgba(0, 0, 0, 0.1);
                }
                @media (-webkit-device-pixel-ratio: 3) {
                  border: .3px solid rgba(0, 0, 0, 0.1);
                }
              }
              border-radius: 4px;
              color: #999999;
            }
          }

          .rating-time {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 12px;
            line-height: 1em;
            color: #666666;
          }
        }
      }
    }
  }
}
</style>
