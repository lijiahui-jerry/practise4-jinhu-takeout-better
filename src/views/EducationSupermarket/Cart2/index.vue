<template>
 <div class="cart">
  <div class="brief">
   <div class="brief-content">
    <div class="left" @click="toggleIfShowList()">
     <div class="cart-logo" :class="{'cart-logo-active': totalCount2}">
      <!-- 购物车logo -->
      <i class="iconfont icon-gouwuche"
         :class="{'cart-iconfont-active': totalCount2}"></i>
      <!-- 计数红点 -->
      <div class="goods-count" v-if="totalCount2">
       {{totalCount2}}
      </div>
     </div>
     <div class="price">
      <div class="goods">
       ￥{{totalPrice2}}
      </div>
      <div class="delivery">
       {{deliveryFee(info.deliveryPrice)}}
      </div>
     </div>
    </div>
    <!-- 立即干饭 -->
    <div class="right">
     <div class="pay" :class="payOrNotCLASS()">
      {{payOrNotTEXT()}}
     </div>
    </div>
   </div>
   <!-- 购物车列表弹出动画 -->
   <transition name="pop-up">
    <div class="cart-list" v-show="couldShowList">
     <div class="list-header">
      <span class="list-title">购物车</span>
      <span class="clear-cart" @click="clearCart()">清空</span>
     </div>
     <div class="list-content" ref="cartList">
      <ul>
       <li class="goods" v-for="(good) in goodsInCart" :key="good.uuid">
        <div class="goods-name">
         {{good.name}}
        </div>
        <div class="goods-price">
         ￥{{good.price}}
        </div>
        <CartControl2 class="cart-control" :good="good"></CartControl2>
       </li>
      </ul>
     </div>
    </div>
   </transition>
  </div>
  <!-- 遮罩模糊动画 -->
  <transition name="fade">
   <!-- 购物车列表的遮罩 -->
   <div class="list-cover" v-show="couldShowList" @click="toggleIfShowList()"></div>
  </transition>
 </div>
</template>


<script>
import BScroll from "better-scroll"
import CartControl2 from "../CartControl2"
import {mapState,mapGetters} from "vuex"
import {MessageBox} from "mint-ui"

export default {
  name:"Cart2",
  components:{CartControl2},
  data(){
    return {
      ifShowList:false,
    }
  },
  computed:{
    //根据当前购物车是否为空及是否需要显示列表，综合计算当前是否应该显示购物车列表
    couldShowList(){
      if(0==this.totalCount2){
        this.ifShowList=false
        return false
      }
      //在购物车列表显示后实例化BScroll对象
      if(this.ifShowList){
        this.$nextTick(()=>{
          if(!this.Cart2BScroll){
            this.Cart2BScroll=new BScroll(this.$refs.cartList,{click:true})
          }else{
            this.Cart2BScroll.refresh()
          }
        })
        return this.ifShowList
      }
    },
    ...mapState({
      goodsInCart:state=>state.educationSupermarket.goodsInCart || [],
      info:state=>state.educationSupermarket.info || {},
    }),
    ...mapGetters(['totalCount2','totalPrice2']),
  },
  methods:{
    //配送费
    deliveryFee(fee){
      if(fee){
        return '另需配送费'+fee+'元'
      }else{
        return '免配送费'
      }
    },
    //清空购物车
    clearCart(){
      MessageBox.confirm('是否确定清空购物车?').then(()=>{
        this.$store.dispatch('clearCart2')
      },()=>{})
    },
    //判断当前是否满足起送价要求，返回css类
    payOrNotCLASS(){
      const {totalPrice2}=this
      const {minPrice}=this.info

      return totalPrice2>=minPrice?'enough':'not-enough'
    },
    //判断当前是否满足起送价要求，返回提示信息
    payOrNotTEXT(){
      const {totalPrice2}=this
      const {minPrice}=this.info

      if(0==totalPrice2) return `${minPrice}元起送`
      else if(totalPrice2<minPrice) return `还差${minPrice-totalPrice2}元起送`
      else return '立即购买'
    },
    //切换购物车列表的显示状态
    toggleIfShowList(){
      if(this.totalCount2>0){
        this.ifShowList= !this.ifShowList
      }
    },
  },
}
</script>

<style scoped lang="less">
//调试日记 2022-02-14
// 1.父子的关系也对z-index有影响，因为子是在父的层面上创建的，所以子的z-index会受到父的z-index的继承影响。
.cart{
  position:absolute;
  left:0;
  right:0;
  bottom:0;

  .brief{
    position:absolute;
    left:0;
    right:0;
    bottom:0;
    z-index:140;

    .brief-content{
      display:flex;
      background:#141D27;
      color:#999999;

      .left{
        flex-grow:1;
        height:50px;

        .cart-logo{
          position:relative;
          display:inline-block;
          border:solid 3px;
          border-radius:50%;
          width:52px;
          height:52px;
          box-sizing:border-box;
          background:#141D27;
          top:-10px;
          right:-10px;
          z-index:140;

          &.cart-logo-active{
            background-color:#684E94;
            border-color:#684E94;
          }

          .iconfont{
            display:inline-block;
            width:46px;
            height:46px;
            line-height:46px;
            text-align:center;
            font-size:36px;
            color:#999999;

            &.cart-iconfont-active{
              color:#FFFFFF;
            }
          }

          .goods-count{
            position:absolute;
            top:-8px;
            right:-8px;
            width:20px;
            height:20px;
            line-height:20px;
            text-align:center;
            border-radius:50%;
            font-size:12px;
            font-weight:1000;
            color:#FFFFFF;
            background:red;
          }
        }

        .price{
          display:inline-block;
          height:50px;
          vertical-align:top;
          margin-left:20px;

          .goods{
            color:#FFFFFF;
            font-size:18px;
            line-height:30px;
            height:30px;
            font-weight:1000;
          }

          .delivery{
            color:#999999;
            font-size:12px;
            height:1em;
            line-height:1em;
          }
        }
      }

      .right{
        flex:0 0 100px;
        width:100px;

        .pay{
          height:50px;
          line-height:50px;
          text-align:center;
          font-size:12px;
          font-weight:1000;
          color:#FFFFFF;

          &.not-enough{
            background-color:#2B333B;
          }

          &.enough{
            background-color:#684E94;
          }
        }
      }
    }

    .cart-list{
      position:absolute;
      left:0;
      right:0;
      top:0;
      z-index:-1;
      transform:translateY(-100%);

      &.pop-up-enter-active, &.pop-up-leave-active{
        transition:transform .3s;
      }

      &.pop-up-enter, &.pop-up-leave-to{
        transform:translateY(0);
      }

      .list-header{
        height:30px;
        line-height:30px;
        padding:0 20px;
        background:#F3F5F7;
        border-bottom:1px solid rgba(0, 0, 0, .1);

        .list-title{
          float:left;
          font-size:14px;
        }

        .clear-cart{
          float:right;
          font-size:14px;
          color:#684E94;
        }
      }

      .list-content{
        padding:0 20px;
        max-height:220px;
        overflow:hidden;
        background:#FFFFFF;

        .goods{
          position:relative;
          padding:10px 0;

          &::after{
            content:'';
            display:block;
            bottom:0;
            left:0;
            right:0;
            height:1px;
            background-color:rgba(0, 0, 0, 0.1);
            @media screen{
              @media (-webkit-device-pixel-ratio:2){
                transform:scaleY(0.5);
              }
              @media (-webkit-device-pixel-ratio:3){
                transform:scaleY(0.3);
              }
            }
          }

          .goods-name{
            font-size:16px;
            line-height:1em;
            height:1em;
            margin-bottom:8px;
            max-width:60%;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap;
          }

          .goods-price{
            position:absolute;
            right:90px;
            bottom:14px;
            line-height:24px;
            height:24px;
            font-size:14px;
            font-weight:1000;
            color:red;
          }

          .cart-control{
            position:absolute;
            right:0;
            bottom:10px;
          }
        }
      }
    }
  }

  .list-cover{
    position:fixed;
    top:0;
    left:0;
    width:100vw;
    height:100%;
    backdrop-filter:blur(5px);
    opacity:1;
    background:rgba(0, 0, 0, .7);
    z-index:100;

    &.fade-enter-active, &.fade-leave-active{
      transition:all .3s;
    }

    &.fade-enter, &.fade-leave-to{
      opacity:0;
      background:rgb(0, 0, 0);
    }
  }
}
</style>
