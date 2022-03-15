<template>
  <div class="shop-list">
    <!-- 首页附近商家标题 -->
    <div class="nearby">
      <i class="iconfont icon-fujin"></i><span class="header-title">附近商家</span>
    </div>
    <!-- 首页商家列表 -->
    <div class="items-container">
      <ul>
        <!-- 单个商家 -->

        <li class="container" >
          <div class="row" >

            <div class="col-xs-3"  style="margin: 0;padding: 0">
              <img class="" style="width: 80%;aspect-ratio: 1/1;display: block;margin:0 0 0 auto"
                   src="../../../../../jinhu-takeout-better/public/images/shops/1.jpg" alt="">
            </div>
            <div class="col-xs-9"  style="margin: 0;padding: 0">
             <div class="row">
               <div class="col-xs-12">
                 v
               </div>
             </div>
             <div class="row">
               <div class="col-xs-12">
                 v
               </div>
             </div>
             <div class="row">
               <div class="col-xs-12">
                 v
               </div>
             </div>
             <div class="row">
               <div class="col-xs-12">
                 v
               </div>
             </div>
            </div>
          </div>
        </li>

        <li class="items" v-for="(shop) in shops" :key="shops.uuid" @click="$router.push('shop')">
          <a>
            <!-- 商家图片 -->
            <div class="item-img"><img v-lazy="shop.avatar"></div>
            <!-- 商家详细信息第一行 -->
            <div class="line1-container">
              <!-- 是否推荐、商家名、提供的保障 -->
              <div class="line1">
                <!-- 推荐 -->
                <h4 class="item-title-recommend" v-if="shop.if_recommend">{{ shop.name }}</h4>
                <!-- 不推荐 -->
                <h4 class="item-title" v-else>{{ shop.name }}</h4>
                <!-- 提供的保障 -->
                <ul class="supports-container">
                  <li class="supports" v-for="(support,index) in getSupport(shop)" :key="index">{{ support }}</li>
                </ul>
              </div>
              <!-- 商家详细信息第二行 -->
              <div class="line2-container">
                <!-- 星数、评分、销量、人均 -->
                <div class="line2">
                  <!-- 星数 -->
                  <Star :rating=shop.rating size=24></Star>
                  <!-- 评分 -->
                  <div class="rating">{{ shop.rating }}</div>
                  <!-- 销量、人均 -->
                  <div class="recent-orders">
                    月售&nbsp;{{ shop.sells_counts }}&nbsp;单&nbsp;&nbsp;&nbsp;人均&nbsp;{{ shop.avg_consume }}&nbsp;元
                  </div>
                </div>
                <!-- 商家详细信息第二行最右边 -->
                <div class="line2-right">
                  <!-- 配送方式 -->
                  <span class="delivery" v-if="shop.delivery_type">{{ shop.delivery_type }}</span>
                </div>
              </div>
              <!-- 商家详细信息第三行 -->
              <div class="line3-container">
                <!-- 起送价、配送费 -->
                <p class="line3">
                  <!-- 起送价 -->
                  <span>¥{{ shop.delivery_threshold }}起送</span>
                  <span class="segmentation">/</span>
                  <!-- 配送费 -->
                  <span v-if="0!=shop.delivery_fee">配送费约¥{{ shop.delivery_fee }}</span>
                  <span v-else>免配送费</span>
                </p>
              </div>
            </div>
          </a>
        </li>
      </ul>
      <div><span class="bottom">真的没有啦~</span></div>
    </div>

  </div>

</template>

<script>
//调试日记 2022-02-19
// 1.不要把图片放在数据库，因为会转成BASE64，进而使文件体积变大，并且读取不方便。要放在网站里，或是专门的图片服务器里。
import {mapState} from "vuex"
import Star from "@/components/Star"

export default {
  name: "ShopList",
  components: {Star},
  methods: {
    //根据数据库查询到的supports字符串，得到相应的supports数组，用于v-for，没有任何support则返回空数组。
    getSupport(shop) {
      if (shop) {
        if (shop.supports) {
          return shop.supports.split(',')
        } else return []
      } else return []
    },
  },
  computed: {
    ...mapState({
      shops: state => state.home.shops || [],
    }),
  },
}
</script>

<style scoped lang="less">
.shop-list {
  margin: 0;
  padding: 0;
  border: none;
  position: relative;
  background: #FFFFFF;

  //底部提示文字
  .bottom {
    text-align: center;
    display: block;
    width: 100%;
    font-size: 12px;
    color: #999999;
  }

  //分割导航栏和附近商家的1px细线
  &::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    height: 1px;
    background-color: #E4E4E4;
    @media screen {
      @media (-webkit-device-pixel-ratio: 2) {
        transform: scaleY(0.5);
      }
      @media (-webkit-device-pixel-ratio: 3) {
        transform: scaleY(0.33333);
      }
    }
  }

  //附近商家
  .nearby {
    padding: 10px 10px 0;

    .iconfont {
      margin-left: 5px;
      color: #999999;
    }

    .header-title {
      color: #999999;
      font-size: 14px;
      line-height: 20px;
    }
  }

  //所有商家的容器
  .items-container {
    & > ul {
      //每个商家单独的容器
      .items {
        position: relative;
        width: 100%;

        //分割每个商家的1px细线
        &::before {
          content: '';
          position: absolute;
          z-index: 200;
          left: 0;
          right: 0;
          bottom: 0;
          height: 1px;
          background-color: #F1F1F1;
          @media screen {
            @media (-webkit-device-pixel-ratio: 2) {
              transform: scaleY(0.5);
            }
            @media (-webkit-device-pixel-ratio: 3) {
              transform: scaleY(0.3);
            }
          }
        }

        //使整个单独商家容器作为一个单独超链接
        & > a {
          display: block;
          //改变盒模型默认状态，使内容部分扩大到最外层
          box-sizing: border-box;
          padding: 10px 15px;
          width: 100%;

          //因为没有定义height，所以需要解决高度塌陷问题，使盒子被内容撑开
          &::after {
            content: '';
            display: block;
            clear: both;
          }

          .item-img {
            float: left;
            box-sizing: border-box;
            width: 25%;
            height: 75px;
            padding-right: 10px;

            & > img {
              display: block;
              width: 100%;
              height: 100%;
              border-radius: 10px;
            }
          }

          .line1-container {
            float: left;
            width: 75%;

            .line1 {
              width: 100%;

              &::after {
                content: '';
                display: block;
                clear: both;
              }

              //推荐的商家
              .item-title-recommend {
                float: left;
                width: 150px;
                color: #333333;
                font-size: 16px;
                line-height: 1em;
                font-weight: 1000;

                //推荐字样
                &::before {
                  content: '推荐';
                  display: inline-block;
                  font-size: 12px;
                  line-height: 1em;
                  color: #333333;
                  background-color: #FFD930;
                  padding: 2px 2px;
                  border-radius: 5px;
                  margin-right: 3px;
                }
              }

              //普通的商家
              .item-title {
                float: left;
                width: 150px;
                color: #333333;
                font-size: 16px;
                line-height: 1em;
                font-weight: 1000;
              }

              .supports-container {
                float: right;

                .supports {
                  float: left;
                  font-size: 12px;
                  color: #684E94;
                  border: 1px solid #D5C0CF;
                  padding: 1px;
                  border-radius: 4px;
                }
              }
            }

            .line2-container {
              width: 100%;
              margin-top: 10px;

              &::after {
                content: '';
                display: block;
                clear: both;
              }

              .line2 {
                float: left;
                color: #594675;

                //月销量与人均
                .recent-orders {
                  display: inline-block;
                  margin-top: 3px;
                  float: left;
                  font-size: 12px;
                  color: #666666;
                }
              }

              //配送方式字样
              .line2-right {
                float: right;

                .delivery {
                  display: inline-block;
                  margin-top: 10px;
                  font-size: 12px;
                  padding: 1px;
                  border-radius: 4px;
                  color: #684E94;
                  border: 1px solid #D5C0CF;
                }
              }
            }

            .line3-container {
              width: 100%;
              font-size: 12px;

              &::after {
                content: '';
                display: block;
                clear: both;
              }

              .line3 {
                float: left;
                display: inline-block;
                margin-top: 3px;
                color: #666666;
              }

              //分割号/
              .segmentation {
                color: #2D1C4D;
              }
            }
          }
        }
      }
    }
  }


}
</style>
