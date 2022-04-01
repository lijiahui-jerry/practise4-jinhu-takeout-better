<template>
  <div class="shop-goods">
    <div class="goods">
      <!-- 左侧菜单 -->
      <div class="menu-wrapper">
        <ul>
          <li class="menu-item" v-for="(good, index) in goods" :key="index"
              :class="{current: index===currentIndex}" @click="menuJumpTo(index)">
            <span class="food-item-name">{{ good.name }}</span>
          </li>
        </ul>
      </div>
      <!-- 右侧餐品 -->
      <div class="foods-wrapper">
        <!-- 包裹所有餐品的大ul -->
        <ul ref="foods">
          <li class="food-list" v-for="(good, index) in goods" :key="index">
            <!-- 餐品对应左侧菜单分类的header -->
            <h3 class="food-header-name">{{ good.name }}</h3>
            <!-- 包裹每个分类的小ul -->
            <ul>
              <li class="food-item" v-for="(food, index) in good.foods" :key="index"
                  @click="showFoodDetail(food)">
                <!-- 餐品图片 -->
                <div class="food-img">
                  <img width="60" height="60" v-lazy="food.icon">
                </div>
                <!-- 餐品简介 -->
                <div class="brief">
                  <h3 class="name">{{ food.name }}</h3>
                  <p class="desc">{{ food.description }}</p>
                  <!-- 销售情况 -->
                  <div class="sells-situation">
                    <span>月售{{ food.sellCount }}份</span>
                    <span>好评{{ food.rating }}%</span>
                  </div>
                  <!-- 价格情况 -->
                  <div class="price">
                    <span class="old" v-if="food.oldPrice">￥{{ food.oldPrice }}&nbsp;</span>
                    <span class="new">￥{{ food.price }}</span>
                  </div>
                  <!-- 购物车行为控制 -->
                  <CartControl class="cart-control" :food="food"></CartControl>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    <!-- 购物车 -->
    <Cart class="cart-component"></Cart>
    <!-- 点击后全屏显示餐品详情 -->
    <Food :food="food" ref="food"/>
  </div>
</template>

<script>
import {mapState} from "vuex"
import CartControl from "@/components/CartControl"
import Cart from "@/components/Cart"
import Food from "@/components/Food"
import BScroll from 'better-scroll'

export default {
  name: "ShopGoods",
  components: {CartControl, Cart, Food},
  data() {
    return {
      scrollY: 0,
      //用于存放右侧每个小ul的Y轴位置
      menuItemPositions: [],
      food: {},
    }
  },
  computed: {
    ...mapState({
      goods: (state) => state.shop.goods || [],
    }),
    //计算当前右侧分类的下标
    currentIndex() {
      const {scrollY, menuItemPositions} = this
      return menuItemPositions.findIndex((top, index) => {
        //寻找一个下标，这个下标所对应的元素不但要位于当前滑动高度之前，还要位于下一个元素之前
        //上一个元素->所找元素->下一个元素
        return top <= scrollY && scrollY < menuItemPositions[index + 1]
      })
    },
  },
  methods: {
    //全屏显示餐品的详细信息
    showFoodDetail(food) {
      this.food = food
      this.$refs.food.toggleIfShow()
    },
    //点击左侧菜单，右侧自动滑动至相应小ul
    menuJumpTo(index) {
      const y = this.menuItemPositions[index]
      this.scrollY = y
      this.foodsScroll.scrollTo(0, -y, 200)
    },
    //创建BScroll
    newScroll() {
      new BScroll('.menu-wrapper', {
        click: true,
      })
      this.foodsScroll = new BScroll('.foods-wrapper', {
        click: true,
      })
      //监听右侧食物的滑动情况
      this.foodsScroll.on('scrollEnd', ({y}) => {
        this.scrollY = Math.abs(y)
      })
    },
    //右侧分类菜单位置相关的信息
    initialMenuItemPositions() {
      const menuItemPositions = []
      let pos = 0
      //首个分类菜单的位置一定是0，最顶部
      menuItemPositions.push(pos)

      let lis = this.$refs.foods.getElementsByClassName('food-list')
      /*************************************************
       * 为什么要这样写？                                  *
       * 得到的HTMLCollection并不是一个数组，而是一个对象，    *
       * 所以它不能直接使用数组的forEach（它甚至没有这个方法）。 *
       * 因此需要先将它转换为数组：                          *
       *  1.使用from()，将对象转为数组                      *
       *  2.使用slice，将对象切分为数组                     *
       *************************************************/
      Array.prototype.slice.call(lis).forEach((li) => {
        pos += li.clientHeight
        menuItemPositions.push(pos)
      })

      this.menuItemPositions = menuItemPositions
    },
  },
  mounted() {
    this.$store.dispatch('getShopGoods', () => {
      this.$nextTick(() => {
        this.newScroll()
        this.initialMenuItemPositions()
      })
    })
  },
}
</script>

<style scoped lang="less">
.shop-goods {
  /*
  调试日记 2022-02-08
   多次修改position类型及位置属性无果后，发现Cart组件放在了goods类中，移出后正常。
   */
  position: absolute;
  top: 255px;
  bottom: 0;
  left: 0;
  right: 0;

  .goods {
    display: flex;
    background: #FFFFFF;
    position: absolute;
    top: 0;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;

    .menu-wrapper {
      flex: 0 0 80px;
      width: 80px;
      background: #F3F5F7;
      text-align: center;

      .menu-item {
        display: inline-block;
        height: 50px;
        width: 100%;
        padding: 0 10px;
        margin: 0;
        line-height: 50px;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          top: 0;
          left: 10%;
          right: 10%;
          background: rgba(0, 0, 0, .1);
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

        &.current {
          margin: -1px 0;
          background: #FFFFFF;
          color: #684E94;
          font-weight: 1000;
        }

        .food-item-name {
          font-size: 12px;
          width: 56px;
        }
      }
    }

    .foods-wrapper {
      padding: 0;

      .food-header-name {
        font-size: 12px;
        padding-left: 1em;
        height: 2em;
        line-height: 2em;
        border-left: 2px solid #999999;
        color: #666666;
        background: rgba(7, 17, 27, 0.1);
      }

      .food-item {
        display: flex;
        margin: 16px;
        padding-bottom: 16px;
        position: relative;

        &::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: #D9DDE1;
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

        //每个小类中的最后一个餐品
        &:last-child {
          margin-bottom: 0;

          &::after {
            height: 0;
          }
        }

        //餐品照片
        .food-img {
          flex: 0 0 60px;
          margin-right: 10px;

          & > img {
            border-radius: 5px;
          }
        }

        .brief {
          .name {
            font-size: 15px;
            height: 1em;
            line-height: 1em;
            margin: 2px 0 4px;
          }

          .desc {
            font-size: 12px;
            line-height: 1em;
            color: #999999;
            margin-bottom: 6px;
          }

          .sells-situation {
            font-size: 12px;
            line-height: 1em;
            color: #999999;

            & > span {
              margin-right: 1em;

              &:last-child {
                margin: 0;
              }
            }
          }

          .price {
            font-weight: 1000;
            line-height: 24px;

            .new {
              font-size: 16px;
              color: red;
            }

            .old {
              text-decoration: line-through;
              font-size: 12px;
              color: gray;
            }
          }
        }

        .cart-control {
          position: absolute;
          right: 0;
          bottom: 0;
        }
      }
    }
  }
}
</style>
