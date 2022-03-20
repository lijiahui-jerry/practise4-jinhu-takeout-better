<template>
 <div class="lost-and-found">
  <Header class="header" title="失物招领" left=true></Header>
  <div class="content">
   <img src="./image/no-built.png" alt="not built already">
  </div>
 </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  name:"LostAndFound",
  components:{Header},
}
</script>

<style scoped lang="less">
.lost-and-found{
  width:100vw;
  height:100vh;
  position:relative;

  .content{
    position:absolute;
    top:45px;
    bottom:0;
    left:0;
    right:0;

  }
}
</style>
