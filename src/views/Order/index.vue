<template>
  <div class="order-main">
    <Header title="订单列表"></Header>
    <div class="order-content" ref="orderContent">
      <ul class="orders-ul">
        <li class="order-li" v-for="shop in orderList" :key="shop.uuid">
          <div class="row line1">
            <div class="col-xs-2 order-shop-avatar">
              <img class="img-rounded" :src="shop.shop_avatar">
            </div>
            <div class="col-xs-10 order-shop-name" @click="$router.push('shop')">
              {{ shop.shop_name }}<i class="iconfont icon-xiangyou1"></i>
            </div>
          </div>
          <div class="row line2">
            <span class="col-xs-12 order-goods-brief">
              <span v-for="(item,index) in shop.goods">
                <img class="order-goods-img" :src="item.good_avatar" :key="item.uuid" v-if="index<5">
                <span class="order-goods-name" v-if="shop.goods.length==1">{{ item.name }}*{{ item.counts }}</span>
              </span>
                <span v-if="shop.goods.length>5" style="font-weight: 600">···</span>
              <span class="order-goods-counts" v-if="shop.goods.length>1">共{{ goodsCounts(shop) }}件</span>
            </span>
          </div>
          <div class="row line3">
            <div class="col-xs-4 order-price">
              共<span class="number">{{ goodsCost(shop) }}</span>元
            </div>
            <div class="col-xs-2"></div>
            <div class="col-xs-3 order-confirm-receipt" @click="confirmReceipt()">
             <span class="order-confirm-receipt-btn">
              确认收货
             </span>
            </div>
            <div class="col-xs-3 order-one-more" @click="oneMore()">
              <span class="order-one-more-btn">
                再来一单
             </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import BScroll from "better-scroll"
import {mapState} from "vuex";

export default {
  name: "Order",
  components: {Header},
  methods: {
    //再来一单
    oneMore() {
      alert('再来一单')
    },
    //确认收货
    confirmReceipt() {
      alert('确认收货')
    },
    // 订单商品总数量
    goodsCounts(item) {
      return item.goods.reduce((pre, item) => pre + item.counts, 0)
    },
    // 订单商品总价
    goodsCost(item) {
      return item.goods.reduce((pre, item) => pre + item.costs * item.counts, 0)
    },
  },
  mounted() {
    this.$store.dispatch('getOrderList')
    this.$nextTick(() => {
      setTimeout(() => {
        if (!this.orderBS)
          this.orderBS = new BScroll(this.$refs.orderContent, {click: true})
        else
          this.orderBS.refresh()
      }, 200)
    })
  },
  computed: {
    ...mapState({
      orderList: state => state.order.orderList
    }),
  }
}
</script>

<style scoped lang="less">
.order-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;

  .order-content {
    position: absolute;
    top: 45px;
    bottom: 0;
    left: 0;
    right: 0;
    overflow: hidden;

    .orders-ul {
      padding: 5px 0;
      .order-li {
        background-color: #f2f2f2;
        margin: 0 10px 10px;
        padding: 5px;
        border-radius: 4px;

        .line1 {
          text-align: left;

          .order-shop-avatar {
            text-align: right;

            .img-rounded {
              width: 25px;
              aspect-ratio: 1/1;
            }
          }

          .order-shop-name {
            padding-left: 0;
            font-size: 18px;
            font-weight: 600;
            line-height: 25px;
          }
        }

        .line2 {
          .order-goods-brief {
            margin: 10px 0;
            font-size: 15px;
            overflow: hidden;

            .order-goods-img {
              width: 50px;
              aspect-ratio: 1/1;
              margin-right: 5px;
              border-radius: 5px;
            }

            .order-goods-name {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }

        .line3 {
          padding: 5px 0;

          .order-price {
            font-size: 14px;

            .number {
              color: red;
            }
          }

          .order-confirm-receipt {
            padding-right: 0;
            text-align: right;

            .order-confirm-receipt-btn {
              font-size: 14px;
              color: #FFFFFF;
              background-color: #684E94;
              padding: 4px;
              border-radius: 5px;
            }
          }

          .order-one-more {
            padding-left: 0;
            text-align: center;

            .order-one-more-btn {
              font-size: 14px;
              color: #FFFFFF;
              background-color: #684E94;
              padding: 4px;
              border-radius: 5px;
            }
          }
        }
      }
    }
  }
}
</style>
