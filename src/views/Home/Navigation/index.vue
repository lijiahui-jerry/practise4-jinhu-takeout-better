<template>
  <!-- 首页商家导航 -->
  <div class="nav">
    <div class="swiper-container" ref="mySwiper">
      <div class="swiper-wrapper">
        <div class="swiper-slide" v-for="(navPages) in navigationArr" :key="navPages.uuid">
          <div class="nav-link" v-for="(nav) in navPages" :key="nav.uuid" @click="$router.push(nav.link)">
            <div class="img-container">
              <img class="img-rounded" v-lazy="nav.image" :alt="nav.description">
            </div>
            <span class="img-title">{{ nav.title }}</span>
          </div>
        </div>
      </div>
      <!-- 分页器 -->
      <div class="swiper-pagination"></div>
    </div>
  </div>
</template>

<script>
import Swiper from "swiper"
import {mapState} from "vuex"

export default {
  name: "Navigation",
  computed: {
    ...mapState({
      navigation: state => state.home.navigation || [],
    }),
    //根据返回的数据动态生成一维或多维数组，用于swiper动态分页，一页最多显示8个
    navigationArr() {
      const {navigation} = this
      //用于存放小数组的大数组，它的维数相当于页数
      const pageArr = []
      //用于存放具体数据的小数组，最大元素量为8，即每页最多显示8条数据
      let dataArr = []
      navigation.forEach((n) => {
        //在小数组满且需要继续添加数据时进入
        if (8 === dataArr.length) dataArr = []
        //在首次循环或每次小数组满时进入
        if (0 === dataArr.length) pageArr.push(dataArr)
        dataArr.push(n)
      })
      return pageArr
    },
  },
  watch: {
    navigation() {
      this.$nextTick(() => {
        new Swiper(this.$refs.mySwiper, {
          loop: true,
          /* 大问题：此处使用ref会导致分页器更新混乱并出现划不动现象 */
          /* 查阅文档知：refs不是响应式的，因此不能用在v-for等模板中。 */
          pagination: {el: '.swiper-pagination'},
        })
      })
    },
  },
}
</script>

<style scoped lang="less">
.nav {
  padding-top: 5px;
  height: 220px;
  background: #F7F7F7;

  //swiper插件
  .swiper-container {
    width: 100%;
    height: 100%;

    .swiper-wrapper {
      border: none;

      .swiper-slide {
        display: flex;
        //允许flex布局换行
        flex-wrap: wrap;

        //每个可点击跳转的导航
        .nav-link {
          display: block;
          width: 25%;
          text-align: center;

          .img-container {
            width: 100%;
            padding-bottom: 5px;

            .img-rounded {
              width: 60px;
              aspect-ratio: 1/1;
              border-radius: 50%;
            }
          }

          .img-title {
            display: block;
            width: 100%;
            text-align: center;
            font-size: 14px;
            color: #666666;
          }
        }
      }
    }
  }

  .swiper-pagination {
    bottom: 0;
  }
}
</style>
