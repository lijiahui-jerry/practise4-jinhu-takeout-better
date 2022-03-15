<template>
 <div class="search">
  <!-- 搜索页头部 -->
  <Header title="搜索"></Header>
  <form class="search-form" action="#">
   <input type="text" placeholder="请输入商家名称" class="search-input" v-model="keyword">
   <div class="search-submit">搜搜看</div>
  </form>
  <!-- 搜索结果 -->
  <div class="search-result" v-if="searchResult&&(!ifFirstGet)" ref="searchResult">
   <ul>
    <li class="result-item">
     <div class="left">
      <img src="./a.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>

    <li class="result-item">
     <div class="left">
      <img src="./b.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./a.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./b.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./a.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./b.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./a.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./b.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./a.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./b.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./a.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./b.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./a.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./b.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./a.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
    <li class="result-item">
     <div class="left">
      <img src="./b.jpg">
     </div>
     <div class="right">
      <p>暂未完成后台建设，现在是静态的</p>
      <p>月售NaN单</p>
      <p><span>NaN元起送</span><span>位于NaN</span></p>
     </div>
    </li>
   </ul>
  </div>
  <!-- 无搜索结果 -->
  <div class="search-no-result" v-if="!searchResult">
   <img src="./images/no-result.jpg">
   <p>没有找到你搜索的商家或商品</p>
   <p>换一个词试试吧</p>
  </div>
 </div>
</template>

<script>
import Header from "@/components/Header"
import BScroll from "better-scroll"

export default {
  methods:{},
  name:"Search",
  components:{Header},
  data(){
    return {
      keyword:'',
      ifFirstGet:false,
      searchResult:true,
    }
  },
  mounted(){
    new BScroll(this.$refs.searchResult,{click:true})
  },
}
</script>

<style scoped lang="less">
.search{
  width:100vw;
  height:100vh;
  position:relative;

  .search-form{
    margin-top:45px;
    padding:10px 15px;

    &::after{
      content:'';
      display:block;
      clear:both;
    }

    .search-input{
      font-size:14px;
      float:left;
      height:35px;
      padding:0 4px;
      border-radius:4px;
      outline:none;
      width:70%;
      border:4px solid #F2F2F2;
      background-color:#F2F2F2;
    }

    .search-submit{
      font-size:16px;
      color:#FFFFFF;
      float:right;
      width:15%;
      height:35px;
      line-height:35px;
      text-align:center;
      padding:0 4px;
      border-radius:4px;
      border:4px solid #684E94;
      background-color:#684E94;
    }
  }

  .search-result{
    position:absolute;
    top:63px;
    bottom:50px;
    left:0;
    right:0;
    overflow:hidden;

    & ul{
      padding-bottom:50px;

      .result-item{
        display:flex;
        padding:10px 10vw;
        position:relative;

        &::after{
          content:'';
          display:block;
          position:absolute;
          left:6vw;
          right:6vw;
          bottom:0;
          height:1px;
          background-color:rgba(0, 0, 0, .1);
          @media screen{
            @media (-webkit-device-pixel-ratio:2){
              transform:translateY(.5);
            }
            @media (-webkit-device-pixel-ratio:3){
              transform:translateY(.3);
            }
          }
        }

        &:last-child{
          &::after{
            height:0
          }
        }

        .left{
          margin-right:20px;

          & img{
            width:50px;
            height:50px;
            display:block;
          }
        }

        .right{
          font-size:13px;
          flex:1;

          & p{
            line-height:14px;
            margin-bottom:6px;

            &:last-child{
              margin-bottom:0;
            }

            & span{
              margin-right:10px;

              &:last-child{
                margin-right:0;
              }
            }
          }
        }
      }
    }
  }

  .search-no-result{
    & img{
      display:block;
      width:80vw;
      margin:0 auto;
      border-radius:10px;
    }

    & p{
      font-size:16px;
      line-height:1em;
      text-align:center;
      margin-top:15px;

      &:last-child{
        font-size:12px;
        color:#999999;
        line-height:1em;
      }
    }
  }
}
</style>
