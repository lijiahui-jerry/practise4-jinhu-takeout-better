<template>
  <div class="order-detail-main">
    <div class="main-title">
      提交订单
    </div>
    <div ref="BSContainer" class="scroll-container">
      <div style="overflow:hidden;">
        <el-card class="box-card distribution-card">
          <div class="text item">
            <el-tag class="tag" size="small">学校</el-tag>
            <span class="address">河东男寝15栋204室</span>
          </div>
          <div class="text item">
            <el-row :gutter="8">
              <el-col :span="2">
                <div class="grid-content last-name">李</div>
              </el-col>
              <el-col :span="3">
                <div class="grid-content">先生</div>
              </el-col>
              <el-col :span="19">
                <div class="grid-content">17601355494</div>
              </el-col>
            </el-row>
            <el-row class="row3">
              <el-col :span="4">
                <div class="grid-content delivery">立即送出</div>
              </el-col>
              <el-col :span="8" :offset="11">
                <div class="grid-content complete-delivery-time">大约17:21送达</div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card payment-card ">
          <div class="text item">
            <el-row>
              <el-col :span="4">
                <div class="grid-content payment-type">支付方式</div>
              </el-col>
              <el-col :span="4" :offset="15">
                <div class="grid-content complete-delivery-time">线上支付</div>
              </el-col>
              <el-col :span="1">
                <div class="grid-content complete-delivery-time">
                  <i class="el-icon-arrow-right"></i>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-card>
        <el-card class="box-card goods-detail">
          <div slot="header" class="clearfix">
            <span style="font-size: 18px;font-weight: 600;">麻辣香锅（西一店）</span>
            <el-tag class="tag">金狐专送
            </el-tag>
          </div>
          <div v-for="(item,index) in foodsInCart" :key="index" class="text item">
            <el-row>
              <el-col :span="22">{{ item.name }} X{{ item.count }}</el-col>

              <el-col :span="1" style="text-align: right">￥</el-col>
              <el-col :span="1" style="text-align: left">{{ item.price }}</el-col>
            </el-row>
          </div>
          <el-row>
            <el-col :span="10">打包费</el-col>
            <el-col :span="4" :offset="10" style="text-align: right">￥2</el-col>
          </el-row>
          <el-row>
            <el-col :span="10">配送费</el-col>
            <el-col :span="4" :offset="10" style="text-align: right">￥1</el-col>
          </el-row>
          <el-row>
            <el-col :span="10">门店新客立减</el-col>
            <el-col :span="4" :offset="10" style="text-align: right">￥0.8</el-col>
          </el-row>
          <el-row>
            <el-col :span="10">金狐红包</el-col>
            <el-col :span="8" :offset="5" style="text-align: right;color: #E4E4E4">暂无可用</el-col>
            <el-col :span="1"><i class="el-icon-arrow-right"></i></el-col>
          </el-row>
        </el-card>
      </div>
    </div>
    <div class="buttons-container">
      <el-button-group class="order-submit">
        <el-button type="info" disabled round class="total-price">￥{{ totalPrice }}</el-button>
        <el-button type="info" disabled round class="total-price">&nbsp;</el-button>
        <el-button type="info" disabled round class="total-price">&nbsp;</el-button>
        <el-button type="info" disabled round class="total-price">&nbsp;</el-button>
        <el-button type="info" disabled round class="total-price">&nbsp;</el-button>
        <el-button type="info" disabled round class="total-price">&nbsp;</el-button>
        <el-button type="primary" @click="$router.go(-1)" class="order-cancel">取消订单</el-button>
        <el-button type="primary" round class="submit" @click="orderSubmit()">提交订单</el-button>
      </el-button-group>
    </div>
    <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="90%"
        :before-close="handleClose">
      <span>订单提交成功</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Header from "@/components/Header";
import {mapGetters, mapState} from "vuex";
import BScroll from "better-scroll";

export default {
  name: "OrderDetail",
  components: {Header},
  mounted() {
    this.$nextTick(() => {
      new BScroll(this.$refs.BSContainer, {click: true})
    })
  },
  computed: {
    ...mapState({
      foodsInCart: state => state.shop.foodsInCart || [],
    }),
    ...mapGetters(['totalPrice']),

  },
  data() {
    return {
      dialogVisible: false
    }
  },
  methods: {
    handleClose() {
      this.dialogVisible = false
    },
    orderSubmit() {
      this.dialogVisible = true
    }
  }
}
</script>

<style scoped lang="less">
.order-detail-main {
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(#684E94 0, #F0F0F0 200px);

  .main-title {
    width: 100%;
    height: 35px;
    line-height: 35px;
    font-size: 20px;
    color: #FFFFFF;
    text-align: center;
  }

  .scroll-container {
    position: absolute;
    top: 35px;
    bottom: 80px;
    left: 0;
    right: 0;

    .box-card {
      width: 95%;
      margin: 10px auto;
      border: none;
    }

    .distribution-card {

      /deep/ .el-card__body {
        padding: 5px 2px;

        .text {
          font-size: 14px;
          color: #AAAAAA;
        }

        .item {
          padding: 5px 0;

          .tag {
            background-color: rgba(104, 78, 148, .2);
            border-color: rgba(104, 78, 148, .4);
            color: rgb(104, 78, 148);
          }

          .address {
            margin-left: 5px;
            font-size: 17px;
            font-weight: 600;
            letter-spacing: 0.1em;
            color: #000000;
          }

          .last-name {
            text-align: right;
          }

          .row3 {
            text-align: right;
            margin-top: 4px;

            .delivery {
              color: #000000;
              font-weight: 800;
            }

            .complete-delivery-time {
              color: #684E94;
            }
          }
        }
      }
    }

    .payment-card {
      /deep/ .el-card__body {
        padding: 5px 2px;

        .payment-type {
          font-weight: 800;
        }
      }
    }

    .goods-detail {
      .text {
        font-size: 14px;
      }

      .item {
        margin-bottom: 18px;
      }

      .clearfix:before,
      .clearfix:after {
        display: table;
        content: "";
      }

      .clearfix:after {
        clear: both
      }

      .clearfix {
        .tag {
          float: right;
          padding: 0;
          border: none;
          background-color: rgba(0, 0, 0, 0);
          color: rgb(104, 78, 148);
        }
      }

      .box-card {
        width: 480px;
      }
    }
  }

  .buttons-container {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 40px;

    .order-submit {
      //align-self: center;
      //left: 5%;
      //transform: translateX(-50%);
      //margin: 0 auto;
      display: inline-block;

      .total-price, .order-cancel, .submit {
        padding: 10px;
      }

      .total-price {
        background-color: gray;
        border: solid gray 1px;
      }

      .order-cancel {
        background-color: #7b6a99;
        border: #684E94 solid 1px;
      }

      .submit {
        background-color: #684E94;
        border: #684E94 solid 1px;
      }
    }
  }
}
</style>
