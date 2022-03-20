<template>
  <div class="shop-list">
    <!-- 首页附近商家标题 -->
    <div class="nearby">
      <i class="iconfont icon-fujin"></i><span class="header-title">附近商家</span>
    </div>
    <!-- 首页商家列表 -->
    <div class="items-container" ref="itemList">
      <ul class="item-ul">
        <!-- 单个商家 -->
        <li class="row item-li" v-for="(shop) in shops" :key="shop.uuid" @click="$router.push('shop')">
          <!-- 商家头像 -->
          <div class="col-xs-3 avatar">
            <img class="img-rounded" v-lazy="shop.avatar">
          </div>
          <!-- 商家简要信息 -->
          <div class="col-xs-9 brief">
            <div class="row line1">
              <!-- 商家店名 -->
              <div class="col-xs-8 line1-left">
                <span class="item-title recommend" v-if="shop.if_recommend">{{ shop.name }}</span>
                <span class="item-title" v-else>{{ shop.name }}</span>
              </div>
              <!-- 提供的保障 -->
              <div class="col-xs-4 line1-right">
                <ul class="supports-container">
                  <li class="supports" v-for="(support,index) in getSupport(shop)" :key="index">
                    {{ support }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="row line2">
              <div class="col-xs-8 rating">
                <!-- 商家评分 -->
                <Star class="rating-star" :rating=shop.rating size=24></Star>
                <span class="rating-score">{{ shop.rating }}</span>
              </div>
              <div class="col-xs-4 delivery">
                <span class="delivery-content" v-if="shop.delivery_type">
                  {{ shop.delivery_type }}
                </span>
              </div>
            </div>
            <div class="row line3">
              <div class="col-xs-12">
                <!-- 销量、人均 -->
                月售{{ shop.sells_counts }}单&nbsp;&nbsp;人均{{ shop.avg_consume }}元
              </div>
            </div>
            <div class="row line4">
              <div class="col-xs-12">
                <!-- 起送价 -->
                <span>¥{{ shop.delivery_threshold }}起送</span>
                <span class="segmentation">/</span>
                <!-- 配送费 -->
                <span v-if="shop.delivery_fee">配送费约¥{{ shop.delivery_fee }}</span>
                <span v-else>免配送费</span>
              </div>
            </div>
          </div>
        </li>
        <li style="text-align: center">真的没有啦~</li>
      </ul>
    </div>

  </div>

</template>

<script>
//调试日记 2022-02-19
// 1.不要把图片放在数据库，因为会转成BASE64，进而使文件体积变大，并且读取不方便。要放在网站里，或是专门的图片服务器里。
import {mapState} from "vuex"
import Star from "@/components/Star"
import BScroll from "better-scroll";

export default {
  name: "ShopList",
  components: {Star},
  mounted() {
    this.$nextTick(() => {
      setTimeout(() => {
        if (!this.shopListBS)
          this.shopListBS = new BScroll(this.$refs.itemList, {click: true})
        else
          this.shopListBS.refresh()
      }, 200)
    })
  },
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
  .nearby {
    position: absolute;
    top: 0;
    height: 30px;
    left: 0;
    right: 0;
    padding: 5px 10px 0;

    .iconfont {
      margin-left: 5px;
      color: #999999;
      line-height: 20px;
      height: 20px;
    }

    .header-title {
      color: #999999;
      font-size: 14px;
      line-height: 20px;
      height: 20px;
    }
  }

  .items-container {
    overflow: hidden;
    position: absolute;
    top: 30px;
    left: 0;
    right: 0;
    bottom: 0;

    .item-ul {
      .item-li {
        background-color: #F0F0F0;
        padding: 5px 0;
        margin: 0 10px 10px;
        border-radius: 10px;
        position: relative;

        &:last-child {
          margin-bottom: 0;
        }

        .avatar {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);

          .img-rounded {
            width: 100%;
            aspect-ratio: 1/1;
          }
        }

        .brief {
          float: right;
          padding: 0;

          .line1 {
            margin-top: 4px;

            .line1-left {
              overflow: hidden;
              text-overflow: ellipsis;
              padding-right: 0;

              .item-title {
                color: #333333;
                font-size: 18px;
                line-height: 1em;
                height: 1em;
                font-weight: 800;
                white-space: nowrap;
              }

              .recommend {
                &::before {
                  content: '推荐';
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 12px;
                  line-height: 1em;
                  color: #333333;
                  background-color: #FFD930;
                  padding: 2px 2px;
                  border-radius: 5px;
                  margin-right: 3px;
                }
              }
            }

            .line1-right {
              .supports-container {
                display: flex;

                .supports {
                  display: inline-block;
                  text-wrap: avoid;
                  text-align: center;
                  font-size: 12px;
                  line-height: 1em;
                  color: #684E94;
                  border: 1px solid #D5C0CF;
                  border-radius: 4px;
                  padding: 2px;
                  margin-right: 1px;
                }
              }
            }
          }

          .line2 {
            margin-top: 4px;

            .rating {
              .rating-star {
                display: inline-block;
                font-size: 14px;
                line-height: 1em;
              }

              .rating-score {
                margin-left: 4px;
                font-size: 14px;
                line-height: 1em;
              }
            }

            .delivery {
              margin-top: -4px;

              .delivery-content {
                font-size: 12px;
                line-height: 1em;
                padding: 2px;
                color: #684E94;
                border: 1px solid #D5C0CF;
                border-radius: 4px;
              }
            }
          }

          .line3 {
            font-size: 13px;
            line-height: 1em;
            margin-top: 4px;
          }

          .line4 {

            font-size: 13px;
            line-height: 1em;
            margin-top: 4px;

            .segmentation {
              color: #2D1C4D;
            }
          }
        }
      }
    }
  }
}
</style>
