<template>
 <div class="print-service">
  <Header class="header" title="校园印技" left=true></Header>
  <div class="content">
   <div class="print-img-preview">
    <p v-if="!imgUrl">选择图片后在此预览</p>
    <img :src="imgUrl" v-else>
   </div>
   <p>
    <input type="file" accept="image/*" id="print-img" @change="previewImg($event)">
   </p>
   <button class="img-submit" @click="submitImg(imgUrl)">确认上传</button>
  </div>
 </div>
</template>

<script>
import Header from "@/components/Header"

export default {
  name:"PrintService",
  data(){
    return {
      imgUrl:'',
    }
  },
  methods:{
    //图片上传
    submitImg(file){
      if(file){
        alert('上传成功')
      }else{
        alert('上传错误，请重试')
      }
    },
    //图片预览
    previewImg(event){
      this.imgUrl=window.URL.createObjectURL(event.target.files[0])
    },
  },
  components:{Header},
}
</script>

<style scoped lang="less">
.print-service{
  width:100vw;
  height:100vh;
  position:relative;
  text-align:center;
  overflow:hidden;

  .content{
    position:absolute;
    top:45px;
    bottom:0;
    left:0;
    right:0;
    overflow:hidden;

    .print-img-preview{
      width:80%;
      max-height:70%;
      margin:20px auto;
      border:solid 1px rgba(0, 0, 0, .3);
      overflow:hidden;

      & > p{
        margin:10px 0;
      }

      & > img{
        width:100%;
      }
    }

    .img-submit{
      width:100px;
      height:30px;
      margin-top:20px;
      color:#FFFFFF;
      background-color:#684E94;
      border:none;
      border-radius:5px;
    }
  }
}
</style>
