<template>
 <!-- 灰色背景 -->
 <div class="full-screen">
  <!-- 提示框 -->
  <div class="tip-container">
   <!-- 感叹号 -->
   <div class="icon">
    <!-- 通过css实现感叹号的占位标签 -->
    <span></span>
    <span></span>
   </div>
   <p class="text">{{tips}}</p>
   <!-- 确认按钮 -->
   <div class="confirm" @click="closeTip">确认</div>
  </div>
 </div>
</template>

<script>
export default {
  name:"Tip",
  props:{
    tips:String,
  },
  methods:{
    closeTip(){
      this.$emit('closeTip')
    },
  },
}
</script>

<style scoped lang="less">
//出现的动画
@keyframes tipAppear{
  0%{
    transform:scale(0);
  }

  25%{
    transform:scale(1.2);
  }

  50%{
    transform:scale(0.8);
  }

  100%{
    transform:scale(1);
  }
}

.full-screen{
  position:fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  z-index:1000;
  background-color:rgba(0, 0, 0, .5);

  .tip-container{
    position:absolute;
    top:30%;
    left:20%;
    width:60%;
    background-color:rgb(255, 255, 255);
    border:1px;
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    border-radius:10px;
    animation:tipAppear .3s;

    //通过css实现的感叹号
    .icon{
      width:55px;
      height:55px;
      border:2px solid red;
      border-radius:50%;
      margin-top:10px;
      display:flex;
      justify-content:center;
      align-items:center;
      flex-direction:column;

      span:nth-of-type(1){
        width:2px;
        height:30px;
        border:0;
        background-color:red;
      }

      span:nth-of-type(2){
        width:4px;
        height:4px;
        border:0;
        border-radius:50%;
        margin-top:2px;
        background-color:red
      }
    }

    .text{
      display:block;
      font-size:14px;
      color:black;
      line-height:20px;
      text-align:center;
      margin-top:10px;
    }

    .confirm{
      font-size:18px;
      font-weight:bold;
      margin-top:10px;
      background-color:#684E94;
      width:100%;
      text-align:center;
      line-height:48px;
      border:0;
      color:#FFFFFF;
      border-bottom-left-radius:10px;
      border-bottom-right-radius:10px;
    }
  }
}
</style>
