<template>
 <transition name="fade">
  <div class="big-image" v-if="ifShow">
   <div class="content">
    <img :src="imgUrl">
   </div>
   <!-- 遮罩 -->
   <div class="cover" @click="toggleIfShow()"></div>
  </div>
 </transition>
</template>

<script>
export default {
  name:"BigImage",
  methods:{
    toggleIfShow(){
      this.ifShow= !this.ifShow
    },
  },
  data(){
    return {
      ifShow:false,
    }
  },
  props:{
    imgUrl:String,
  },
}
</script>

<style scoped lang="less">
.big-image{
  width:100vw;
  height:100vh;
  overflow:hidden;
  position:absolute;
  top:0;
  left:0;
  z-index:100;
  backdrop-filter:blur(10px);

  .content{
    &>img{
      display:block;
      width:100%;
      position:absolute;
      left:0;
      top:50%;
      transform:translateY(-50%);
      z-index:99;
    }
  }

  &.fade-enter-active, &.fade-leave-active{
    transition:all .3s;
  }

  &.fade-enter, &.fade-leave-to{
    opacity:0;
    background:rgb(0, 0, 0);
  }

  //遮罩
  .cover{
    position:fixed;
    top:0;
    right:0;
    width:100vw;
    height:100vh;
    background:rgba(0, 0, 0, .7);
  }

  &.fade-enter-active, &.fade-leave-active{
    transition:all .3s;
  }

  &.fade-enter, &.fade-leave-to{
    opacity:0;
    background:#000000;
  }
}

</style>
