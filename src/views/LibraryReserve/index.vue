<template>
 <div class="library-reserve">
  <Header class="header" title="图书馆预约" left=true></Header>
  <div class="content">
   <img src="./images/no-access-privilege.png">
   <p>校方未接入、请等待校方接入</p>
   <a href="http://library.sspu.edu.cn/">官方入口</a>
  </div>
 </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  name:"LibraryReserve",
  components:{Header},
}
</script>

<style scoped lang="less">
.library-reserve{
  width:100vw;
  height:100vh;
  position:relative;
  text-align:center;

  .content{
    position:absolute;
    top:45px;
    bottom:0;
    left:0;
    right:0;

    & > img{
      display:block;
      margin:0 auto;
      width:90%;
    }

    & > p{
      margin:10px;
      font-size:20px;
    }

    & > a{
      display:block;
      margin:0 auto;
      width:100px;
    }
  }
}
</style>
