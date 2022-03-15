<template>
 <!-- 由评分确定的星星 -->
 <div class="star" :class="'star-'+size">
  <span class="star-item" v-for="(s,index) in howManyStars" :key="index" :class="s"></span>
 </div>
</template>

<script>
export default {
  name:"Star",
  props:{
    rating:String | Number,
    size:String | Number,
  },
  computed:{
    //根据rating计算on、half、off的star类的相应数量，返回长度为5的数组
    howManyStars(){
      const {rating}=this
      const onHalfOff=[]
      let ratingInt=Math.floor(rating)
      //根据整数部分计算有几个满星
      for(let i=0; i<ratingInt; i++) onHalfOff.push('on')
      //根据小数部分计算是否有半星
      if(10*rating-10*ratingInt>=5) onHalfOff.push('half')
      //剩下的用空星填充
      for(let i=onHalfOff.length; i<5; i++) onHalfOff.push('off')
      return onHalfOff
    },
  },
}
</script>

<style scoped lang="less">
.star{
  float:left;
  font-size:0;

  .star-item{
    display:inline-block;
    background-repeat:no-repeat;
    width:15px;
    height:15px;
    background-position:center;
    background-size:100%;
  }

  //根据不同的size、rating及dpr自动匹配相应样式
  &.star-48{
    .star-item{
      &.on{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star48_on@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star48_on@3x.png");
          }
        }
      }

      &.half{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star48_half@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star48_half@3x.png");
          }
        }
      }

      &.off{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star48_off@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star48_off@3x.png");
          }
        }
      }
    }
  }

  &.star-36{
    .star-item{
      &.on{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star36_on@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star36_on@3x.png");
          }
        }
      }

      &.half{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star36_half@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star36_half@3x.png");
          }
        }
      }

      &.off{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star36_off@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star36_off@3x.png");
          }
        }
      }
    }
  }

  &.star-24{
    .star-item{
      &.on{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star24_on@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star24_on@3x.png");
          }
        }
      }

      &.half{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star24_half@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star24_half@3x.png");
          }
        }
      }

      &.off{
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            background-image:url("./images/star24_off@2x.png");
          }
          @media (-webkit-device-pixel-ratio:3){
            background-image:url("./images/star24_off@3x.png");
          }
        }
      }
    }
  }
}
</style>
