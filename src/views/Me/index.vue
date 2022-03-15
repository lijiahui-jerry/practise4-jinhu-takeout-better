<template>
 <div class="me">
  <!-- 个人页面头部 -->
  <Header title="金狐外卖"></Header>
  <!-- 个人信息栏 -->
  <div class="info" @click="routerGo('login')">
   <div class="info-image">
    <i class="iconfont icon-touxiang"></i>
   </div>
   <div class="info-main">
    <p class="name">{{setUserName()}}</p>
    <p class="phone">
     <span class="phone-icon"><i class="iconfont icon-shouji"></i></span>
     <span class="phone-number">{{userInfo.phone || '暂无绑定手机号'}}</span>
    </p>
   </div>
   <!-- 信息栏向右的箭头 -->
   <div class="arrow-right">
    <p><i class="iconfont icon-xiangyou3"></i></p>
   </div>
  </div>
  <!-- 个人财务栏 -->
  <div class="finance" v-if="ifLogged">
   <div class="finance-item">
    <p class="first-line"><span class="item-data data1">{{userInfo.balance}}</span>元</p>
    <p class="second-line">余额</p>
   </div>
   <div class="finance-item">
    <p class="first-line"><span class="item-data data2">{{userInfo.redpacket_count}}</span>个</p>
    <p class="second-line">红包</p>
   </div>
   <div class="finance-item">
    <p class="first-line"><span class="item-data data3">{{userInfo.points}}</span>根</p>
    <p class="second-line">狐毛</p>
   </div>
  </div>
  <!-- 功能栏 -->
  <!--
  /*这个功能用了整整两个下午才完成，全靠自己一点点摸索，对于json格式的设计有了更深一步的理解。
  json设计得好，前端人员可以很轻松地进行v-for，而设计得不好，前端人员甚至无法完成需求，只能通过纯手动来完成*/
   -->
  <!--
  /*后来又对后端技术有了些许了解与学习，发现返回的json文件是由数据库的查询结果组成的。
  对于json的设计，应该说是对于数据库的设计。
  */
   -->
  <!--  <div class="tool-bars" v-if="ifLogged()" v-for="(pwr,index) in powerTools" :key="index">-->
  <!--   <div class="bar" @click="routerGo(p.link)" v-for="(p,index) in pwr" :key="index">-->
  <!--    <div class="bar-left"><i class="iconfont" :class="p.iconfont"></i></div>-->
  <!--    <div class="bar-name">{{p.name}}</div>-->
  <!--    <div class="bar-right"><i class="iconfont icon-xiangyou1"></i></div>-->
  <!--   </div>-->
  <!--  </div>-->
  <div class="tool-bars" v-if="ifLogged">
   <div class="bar" @click="routerGo(powerLinks[index])" v-for="(p,index) in powerTools" :key="index">
    <div class="bar-left"><i class="iconfont" :class="powerIconfonts[index]"></i></div>
    <div class="bar-name">{{p}}</div>
    <div class="bar-right"><i class="iconfont icon-xiangyou1"></i></div>
   </div>
  </div>
 </div>
</template>
<script>
import Header from "@/components/Header"
import {mapState} from "vuex"

export default {
  name:"Me",
  mounted(){
    if(this.ifLogged){
      let token=localStorage.getItem('token')
      this.$store.dispatch('getUserInfo',{token})
    }else{
      this.$store.dispatch('clearUserInfo')
    }
  },
  computed:{
    ...mapState({
      userInfo:(state)=>state.me.userInfo || {},
    }),
    //判断是否登录
    ifLogged(){
      return localStorage.getItem('token')
    },
    //返回包含权限信息的对象
    powerInfo(){
      if(this.userInfo) return this.userInfo.powers
      else return ''
    },
    //返回所拥有的权限组成的数组
    powerTools(){
      if(this.powerInfo) return this.powerInfo.split(',')
      else return []
    },
    //以下是因为对于数据库的操作不熟悉，难于返回数组，所以用以下方法
    //返回所拥有的权限相应的链接所组成的数组
    powerLinks(){
      if(this.userInfo.links) return this.userInfo.links.split(',')
      else return []
    },
    //返回所拥有的权限相应的图标字体所组成的数组
    powerIconfonts(){
      if(this.userInfo.iconfonts) return this.userInfo.iconfonts.split(',')
      else return []
    },
  },
  methods:{
    //路由跳转
    routerGo(path){
      if('logout'!=path) this.$router.push(path)
      else{
        localStorage.clear()
        this.$router.replace('home')
      }
    },
    //动态设置用户名的显示内容
    setUserName(){
      if(this.userInfo.username) return this.userInfo.username+'，欢迎您！'
      else return '登录/注册'
    },
  },
  components:{Header},
}
</script>

<style scoped lang="less">
.me{
  width:100%;
  position:relative;

  .info{
    margin-top:45px;
    position:relative;
    background:#684E94;
    padding:0 20px 10px;

    &::after{
      content:'';
      display:block;
      clear:both;
    }

    //默认头像
    .info-image{
      float:left;
      width:60px;
      height:60px;
      border-radius:50%;
      overflow:hidden;

      & .iconfont{
        color:#684E94;
        background:#E4E4E4;
        font-size:62px;
      }
    }

    .info-main{
      float:left;
      margin-top:5px;
      margin-left:20px;

      p{
        color:#FFFFFF;
        font-size:18px;
        font-weight:1000;
      }

      .phone{
        margin-top:10px;

        //手机号前的图标
        & .iconfont{
          color:#FFFFFF;
          font-size:18px;
        }

      }
    }

    .arrow-right{
      float:right;
      width:50px;
      height:60px;

      & > p{
        text-align:right;
        line-height:60px;

        & .iconfont{
          color:#FFFFFF;
          font-size:30px;
        }
      }
    }
  }

  .finance{
    //给1px细线绝对定位用
    position:relative;
    width:100%;
    background:#FFFFFF;
    overflow:hidden;
    display:flex;

    //个人财务栏下方的1px细线
    &::after{
      content:'';
      position:absolute;
      z-index:200;
      left:0;
      right:0;
      bottom:0;
      background-color:#E4E4E4;
      height:1px;
      @media screen{
        @media (-webkit-device-pixel-ratio:2){
          transform:scaleY(0.5);
        }
        @media (-webkit-device-pixel-ratio:3){
          transform:scaleY(0.3);
        }
      }
    }

    .finance-item{
      //给1px细线绝对定位用
      position:relative;
      flex-grow:1;
      text-align:center;

      //余额栏和红包栏右边的1px细线
      &::after{
        content:'';
        position:absolute;
        z-index:200;
        top:0;
        right:0;
        bottom:0;
        background-color:#E4E4E4;
        width:1px;
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            transform:scaleX(0.5);
          }
          @media (-webkit-device-pixel-ratio:3){
            transform:scaleX(0.3);
          }
        }
      }

      .first-line{
        width:100%;
        font-size:16px;
        margin:10px 0 0;
      }

      .second-line{
        font-size:13px;
        margin:10px 0;
      }

      //元、个、根前的具体数据
      .item-data{
        font-size:32px;
        font-weight:1000;
      }

      .data1{
        color:green;
      }

      .data2{
        color:#FF5F3E;
      }

      .data3{
        color:brown;
      }
    }
  }

  .tool-bars{
    position:relative;
    margin-top:10px;
    margin-bottom:20px;
    background:#FFFFFF;

    &::before{
      content:'';
      position:absolute;
      z-index:200;
      left:0;
      right:0;
      top:0;
      height:1px;
      background-color:#E4E4E4;
      @media screen{
        @media (-webkit-device-pixel-ratio:2){
          transform:scaleY(0.5);
        }
        @media (-webkit-device-pixel-ratio:3){
          transform:scaleY(0.3);
        }
      }
    }

    //所有功能条共享同一个样式
    .bar{
      position:relative;
      display:flex;
      align-items:center;
      padding:10px 20px;

      &::after{
        content:'';
        position:absolute;
        z-index:200;
        left:0;
        right:0;
        bottom:0;
        height:1px;
        background-color:#E4E4E4;
        @media screen{
          @media (-webkit-device-pixel-ratio:2){
            transform:scaleY(0.5);
          }
          @media (-webkit-device-pixel-ratio:3){
            transform:scaleY(0.3);
          }
        }
      }

      //所有图标字体的颜色
      .iconfont{
        color:#684E94;

      }

      .bar-left{
        width:40px;
        height:100%;

        & .iconfont{
          font-size:25px;
        }
      }

      .bar-name{
        width:50%;
        font-size:18px;
      }

      .bar-right{
        display:flex;
        position:absolute;
        right:30px;

        & .iconfont{
          font-size:25px;
        }
      }

    }
  }
}
</style>
