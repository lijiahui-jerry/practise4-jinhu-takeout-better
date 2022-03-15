<template>
 <div class="order">
  <!-- 订单页头部 -->
  <Header title="订单列表"></Header>
  <!-- 已登录 -->
  <div class="content" ref="content">
   <ul>
    <li class="order-card">
     <div class="line1">
      <img class="avatar" src="./image/no-built.png">
      <span>店铺名称</span>
      <span>
       <i class="iconfont icon-xiangyou1"></i>
      </span>
     </div>
     <div class="line2">
      <img class="goods-img" src="./image/1.jpg">
      <span class="goods-name">
       麻辣香锅锅子11111111111111111111
      </span>
      <span class="goods-counts">
       *99
      </span>
     </div>
     <div class="line3">
      <span class="price">￥<span class="number">888</span>元</span>
      <span class="confirm-receipt" @click="confirmReceipt()">确认收货</span>
      <span class="one-more" @click="oneMore()">再来一单</span>
     </div>
    </li>
    <li class="order-card">
     <div class="line1">
      <img class="avatar" src="./image/no-built.png">
      <span>当前为静态的四种情况</span>
      <span>
       <i class="iconfont icon-xiangyou1"></i>
      </span>
     </div>
     <div class="line2">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <span class="goods-counts">
       共2件
      </span>
     </div>
     <div class="line3">
      <span class="price">￥<span class="number">888</span>元</span>
      <span class="confirm-receipt" @click="confirmReceipt()">确认收货</span>
      <span class="one-more" @click="oneMore()">再来一单</span>
     </div>
    </li>
    <li class="order-card">
     <div class="line1">
      <img class="avatar" src="./image/no-built.png">
      <span>后台还在建设</span>
      <span>
       <i class="iconfont icon-xiangyou1"></i>
      </span>
     </div>
     <div class="line2">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <span class="goods-counts">
       <span>&nbsp;共5件</span>
      </span>
     </div>
     <div class="line3">
      <span class="price">￥<span class="number">888</span>元</span>
      <span class="confirm-receipt" @click="confirmReceipt()">确认收货</span>
      <span class="one-more" @click="oneMore()">再来一单</span>
     </div>
    </li>
    <li class="order-card">
     <div class="line1">
      <img class="avatar" src="./image/no-built.png">
      <span>后台还在建设</span>
      <span>
       <i class="iconfont icon-xiangyou1"></i>
      </span>
     </div>
     <div class="line2">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <span class="goods-counts">
       <span>···</span><span>&nbsp;共9件</span>
      </span>
     </div>
     <div class="line3">
      <span class="price">￥<span class="number">888</span>元</span>
      <span class="confirm-receipt" @click="confirmReceipt()">确认收货</span>
      <span class="one-more" @click="oneMore()">再来一单</span>
     </div>
    </li>
    <li class="order-card">
     <div class="line1">
      <img class="avatar" src="./image/no-built.png">
      <span>后台还在建设</span>
      <span>
       <i class="iconfont icon-xiangyou1"></i>
      </span>
     </div>
     <div class="line2">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <img class="goods-img" src="./image/1.jpg">
      <span class="goods-counts">
       <span>···</span><span>&nbsp;共9件</span>
      </span>
     </div>
     <div class="line3">
      <span class="price">￥<span class="number">888</span>元</span>
      <span class="confirm-receipt" @click="confirmReceipt()">确认收货</span>
      <span class="one-more" @click="oneMore()">再来一单</span>
     </div>
    </li>
   </ul>
  </div>
 </div>
</template>

<script>
import Header from "@/components/Header"
import BScroll from "better-scroll"

export default {
  name:"Order",
  components:{Header},
  methods:{
    //再来一单
    oneMore(){
      alert('再来一单')
    },
    //确认收货
    confirmReceipt(){
      alert('确认收货')
    },
  },
  mounted(){
    new BScroll(this.$refs.content,{click:true})
  },
}
</script>

<style scoped lang="less">
.order{
  width:100vw;
  height:100vh;
  position:relative;
  background-color:#F2F2F2;

  .content{
    position:absolute;
    top:45px;
    bottom:50px;
    left:0;
    right:0;

    .order-card{
      width:95%;
      margin:10px auto;
      padding:10px 0;
      border:none;
      border-radius:4px;
      background-color:#FFFFFF;

      .line1{
        font-size:22px;
        height:26px;
        line-height:26px;
        margin:0 4px 4px;
        padding-top:5px;

        .avatar{
          width:26px;
          aspect-ratio:1/1;
          display:inline-block;
          vertical-align:top;
          border-radius:2px;
        }
      }

      .line2{
        margin:10px auto;
        display:flex;
        flex-wrap:nowrap;
        max-width:95%;
        font-size:15px;
        overflow:hidden;
        text-overflow:ellipsis;

        .goods-img{
          //font-size:0;
          width:50px;
          aspect-ratio:1/1;
          margin-right:5px;
          border-radius:5px;
        }

        .goods-name{
          margin-right:10px;
          height:50px;
          line-height:50px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }

        .goods-counts{
          height:50px;
          line-height:50px;
        }
      }

      .line3{
        margin:2px;
        height:30px;
        line-height:20px;

        &::after{
          content:'';
          display:block;
          clear:both;
        }

        .price{
          float:left;
          padding-left:2%;
          font-size:14px;

          .number{
            color:red;
          }
        }

        .one-more, .confirm-receipt{
          float:right;
          font-size:16px;
          color:#FFFFFF;
          background-color:#684E94;
          overflow:hidden;
          padding:3px 6px;
          margin:0 5px;
          border-radius:5px;
          font-weight:0;
        }
      }
    }
  }
}
</style>
