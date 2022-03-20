<template>
 <!-- 添加至购物车或控制购物车中餐品数量 -->
 <div class="cart-control">
  <transition name="roll">
   <!-- 餐品数量减一 -->
   <div class="iconfont icon-jianshao" v-if="good.count" @click.stop="updateCount(false)"></div>
  </transition>
  <div class="count" v-if="good.count">{{good.count}}</div>
  <!-- 餐品数量加一 -->
  <div class="iconfont icon-jia" @click.stop="updateCount(true)"></div>
 </div>
</template>

<script>
export default {
  name:"CartControl2",
  props:{
    good:Object,
  },
  methods:{
    //修改购物车中菜品的数量，true为加1，false为减1
    updateCount(flag){
      this.$store.dispatch('updateCountOfGood',{flag,good:this.good})
    },
  },
}
</script>

<style scoped lang="less">
.cart-control{
  height:34px;

  .iconfont{
    color:#684E94;
    display:inline-block;
    padding:5px;
    font-size:24px;
    line-height:1em;

    &.roll-enter-active, &.roll-leave-active{
      transition:all .3s;
    }

    &.roll-enter, &.roll-leave-to{
      opacity:0;
      transform:translateX(10px) rotate(90deg);
    }
  }

  .count{
    font-size:12px;
    display:inline-block;
    text-align:center;
    vertical-align:middle;
    width:1em;
    height:50%;
  }
}
</style>
