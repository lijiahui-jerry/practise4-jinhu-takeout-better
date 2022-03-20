<template>
  <div class="education-supermarket">
    <Header class="header" left=true title="教育超市"/>
    <div class="content" ref="educationSupermarketContent">
      <ul>
        <li class="goods-card" @click.stop="showGoodsDetail(good)" v-for="(good) in goods" :key="good.uuid">
          <img :src="good.image" class="goods-img">
          <p class="goods-name">{{ good.name }}</p>
          <p class="goods-detail">
      <span>
       <Star class="star" :rating="good.ratingScore" size="24"/>
      </span>
            <span class="sells-count" v-if="good.sellCount>999">月售999+</span>
            <span class="sells-count" v-else>月售{{ good.sellCount }}</span>
          </p>
          <p class="goods-sells">
            <span class="price">￥{{ good.price }}</span>
            <span class="cart-control-wrapper">
       <CartControl2 :good="good"></CartControl2>
      </span>
          </p>
        </li>
      </ul>
    </div>
    <Cart2></Cart2>
    <FullScreenGoodsDetail :good="good" ref="FullScreenGoodsDetail"></FullScreenGoodsDetail>
  </div>
</template>

<script>
import Header from "@/components/Header"
import CartControl2 from "./CartControl2"
import BScroll from "better-scroll"
import FullScreenGoodsDetail from "./FullScreenGoodsDetail"
import Star from "@/components/Star"
import Cart2 from "./Cart2"
import {mapState} from "vuex"

export default {
  name: "EducationSupermarket",
  data() {
    return {
      good: {},
    }
  },
  methods: {
    //全屏展示商品详情
    showGoodsDetail(good) {
      this.good = good
      this.$refs.FullScreenGoodsDetail.ifShow = true
    },
  },
  computed: {
    ...mapState({
      goods: state => state.educationSupermarket.goods,
      info: state => state.educationSupermarket.info,
    }),
  },
  mounted() {
    this.$store.dispatch('getEducationSupermarketInfo')
    this.$store.dispatch('getEducationSupermarketGoods', () => {
      this.$nextTick(() => {
        if (!this.GoodsScroll) {
          this.GoodsScroll = new BScroll(this.$refs.educationSupermarketContent, {click: true})
        } else {
          this.GoodsScroll.refresh()
        }
      })
    })
  },
  components: {FullScreenGoodsDetail, Header, CartControl2, Star, Cart2},
}
</script>

<style scoped lang="less">
.education-supermarket {
  width: 100vw;
  height: 100vh;
  position: relative;
  background-color: #F1F1F1;
  overflow: hidden;

  .content {
    position: absolute;
    top: 45px;
    bottom: 52px;
    left: 0;
    right: 0;
    overflow: hidden;

    & ul {
      width: 90%;
      margin: 0 auto;
      padding-bottom: 15px;
      overflow: hidden;

      .goods-card {
        float: left;
        width: 48%;
        border: none;
        border-radius: 10px;
        background-color: #FFFFFF;
        overflow: hidden;
        margin-top: 10px;

        &:nth-child(even) {
          float: right;
        }

        .goods-img {
          width: 80%;
          aspect-ratio: 1/1;
          display: block;
          margin: 5px auto 0;
          border-radius: 10px;
        }

        .goods-name {
          font-size: 20px;
          line-height: 1em;
          text-align: center;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          margin: 2px;
        }

        .goods-detail {
          font-size: 12px;
          line-height: 1em;
          margin: 5px;

          &::after {
            content: '';
            display: block;
            clear: both;
          }

          .sells-count {
            float: right;
            color: #666666;
            padding-top: 2px;
            padding-right: 8px;
          }
        }

        .goods-sells {
          margin-top: -5px;
          margin-bottom: 10px;

          &::after {
            content: '';
            display: block;
            clear: both;
          }

          .price {
            float: left;
            font-size: 20px;
            line-height: 1em;
            padding: 6px 0 0 8px;
            color: red;
          }

          .cart-control-wrapper {
            float: right;
            transform: scale(.9);
          }
        }
      }
    }
  }
}
</style>
