<template>
  <div class="search-main">
    <!-- 搜索页头部 -->
    <Header title="觅食"></Header>
    <div class="search-form">
      <input type="text" placeholder="请输入商家名称" class="search-input" v-model="keyword">
      <div class="search-submit" @click="searchSubmit()">搜索</div>
    </div>
    <!-- 首页商家列表 -->
    <div class="search-result" ref="searchResult">
      <ul class="item-ul" v-if="searchResult.length>0">
        <!-- 单个商家 -->
        <li class="row item-li" v-for="(shop) in searchResult" :key="shop.uuid" @click="$router.push('shop')">
          <!-- 商家头像 -->
          <div class="col-xs-3 avatar">
            <img class="img-rounded" v-lazy="shop.avatar">
          </div>
          <!-- 商家简要信息 -->
          <div class="col-xs-9 brief">
            <div class="row line1">
              <!-- 商家店名 -->
              <div class="col-xs-12 shop-name">
                <span class="item-title recommend" v-if="shop.if_recommend">{{ shop.name }}</span>
                <span class="item-title" v-else>{{ shop.name }}</span>
              </div>
            </div>
            <div class="row line2">
              <div class="col-xs-12 rating">
                位于{{ shop.location }}
              </div>
            </div>
            <div class="row line3">
              <div class="col-xs-12">
                月售{{ shop.sells_counts }}单&nbsp;人均{{ shop.avg_consume }}元
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>
    <!-- 无搜索结果 -->
    <div class="search-no-result" v-if="!ifFirstGet&&searchResult==0">
      <img src="./images/no-result.jpg">
      <p>没有找到你搜索的商家</p>
      <p>换一个试试吧</p>
    </div>
  </div>
</template>

<script>
import Header from "@/components/Header"
import BScroll from "better-scroll"
import {mapGetters} from "vuex";

export default {
  methods: {
    // 根据keyword搜索商家
    searchSubmit() {
      this.ifFirstGet = false
      this.searchResult = []
      this.shopListForSearch.forEach((item) => {
        if (this.keyword != '' && item.name.indexOf(this.keyword) !== -1)
          this.searchResult.push(item)
      })
      if (this.searchResult.length > 0) {
        this.$nextTick(() => {
          new BScroll(this.$refs.searchResult, {click: true})
        })
      } else if (this.keyword.length == 0) {
        // 在没输入搜索内容时不做反应
        this.ifFirstGet = true
        alert(111)
      }
    }
  },
  name: "Search",
  components: {Header},
  data() {
    return {
      keyword: '',
      ifFirstGet: true,
      searchResult: [],
    }
  },
  mounted() {
    this.ifFirstGet = true
  },
  computed: {
    ...mapGetters(['shopListForSearch'])
  }
}
</script>

<style scoped lang="less">
.search-main {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 50px;

  .search-form {
    padding: 3%;

    &::after {
      content: '';
      display: block;
      clear: both;
    }

    .search-input {
      font-size: 14px;
      line-height: 1em;
      float: left;
      height: 35px;
      padding: 0 4px;
      border-radius: 4px;
      width: 80%;
      border: none;
      background-color: #F2F2F2;
    }

    .search-submit {
      font-size: 14px;
      color: #FFFFFF;
      float: right;
      width: 15%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      border-radius: 4px;
      border: none;
      background-color: #684E94;
    }
  }

  .search-result {
    overflow: hidden;
    position: absolute;
    top: 100px;
    left: 0;
    right: 0;
    bottom: 0;

    .item-ul {
      .item-li {
        background-color: #F0F0F0;
        padding: 5px 0;
        margin: 0 10px 10px;
        border-radius: 10px;
        position: relative;

        &:last-child {
          margin-bottom: 0;
        }

        .avatar {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);

          .img-rounded {
            width: 100%;
            aspect-ratio: 1/1;
          }
        }

        .brief {
          float: right;
          padding: 0;

          .line1 {
            margin-top: 4px;
            text-align: center;

            .shop-name {
              .item-title {
                color: #333333;
                font-size: 18px;
                line-height: 1em;
                height: 1em;
                font-weight: 800;
              }

              .recommend {
                &::before {
                  content: '推荐';
                  display: inline-block;
                  vertical-align: middle;
                  font-size: 12px;
                  line-height: 1em;
                  color: #333333;
                  background-color: #FFD930;
                  padding: 2px 2px;
                  border-radius: 5px;
                  margin-right: 3px;
                }
              }
            }
          }

          .line2 {
            margin-top: 4px;
            text-align: center;

            .rating {
              .rating-star {
                display: inline-block;
                font-size: 14px;
                line-height: 1em;
              }

              .rating-score {
                margin-left: 4px;
                font-size: 14px;
                line-height: 1em;
              }
            }

            .delivery {
              margin-top: -4px;

              .delivery-content {
                font-size: 12px;
                line-height: 1em;
                padding: 2px;
                color: #684E94;
                border: 1px solid #D5C0CF;
                border-radius: 4px;
              }
            }
          }

          .line3 {
            text-align: center;

            font-size: 13px;
            line-height: 1em;
            margin-top: 4px;
          }
        }
      }
    }
  }

  .search-no-result {
    & img {
      display: block;
      width: 80vw;
      margin: 0 auto;
      border-radius: 10px;
    }

    & p {
      font-size: 16px;
      line-height: 1em;
      text-align: center;
      margin-top: 15px;

      &:last-child {
        font-size: 12px;
        color: #999999;
        line-height: 1em;
      }
    }
  }
}
</style>
