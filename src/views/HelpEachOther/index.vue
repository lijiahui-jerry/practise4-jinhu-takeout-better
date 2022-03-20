<template>
  <div class="help-each-other">
    <Header class="header" title="互帮互助" left=true></Header>
    <div class="content">
      <div class="cards-wrapper">
        <div class="card" v-if="ifImage" @click="changeCardFlag()">
          <img v-if="ifImage()" :src="ifImage()" @click.stop="showBigImage()">
          <p>{{ ifContent() }}</p>
        </div>
      </div>
    </div>
    <BigImage :imgUrl="ifImage()" ref="bigImage" v-if="ifImage()"></BigImage>
  </div>
</template>

<script>
import Header from "@/components/Header"
import BigImage from "./BigImage"
import {mapState} from "vuex"

export default {
  name: "HelpEachOther",
  data() {
    return {
      cardFlag: 0,
    }
  },
  methods: {
    //当前卡片索引
    changeCardFlag() {
      if (this.cardFlag + 1 < this.helperList.length)
        this.cardFlag++
      else
        this.cardFlag = 0
    },
    //内容
    ifContent() {
      if (this.helperList[this.cardFlag])
        return this.helperList[this.cardFlag].content
      else return '内容为空'
    },
    //缩略图
    ifImage() {
      if (this.helperList[this.cardFlag])
        return this.helperList[this.cardFlag].image
      else return false
    },
    //展示大图
    showBigImage() {
      this.$refs.bigImage.toggleIfShow()
    },
  },
  computed: {
    ...mapState({
      helperList: (state) => state.helpEachOther.helperList || [],
    }),
  },
  mounted() {
    this.$store.dispatch('getHelperList')
  },
  components: {Header, BigImage},
}
</script>

<style scoped lang="less">
.help-each-other {
  width: 100vw;
  height: 100vh;
  position: relative;

  .content {
    position: absolute;
    top: 45px;
    left: 0;
    right: 0;
    background-color: #f2f2f2;

    .cards-wrapper {
      width: 100%;

      .card {
        width: 90%;
        height: 100%;
        margin: 10px auto;
        border-radius: 10px;
        background-color: #FFFFFF;
        padding: 10px 5px;
        box-sizing: border-box;
        overflow: hidden;

        & > img {
          display: block;
          margin: 0 auto 2px;
        }

        & > p {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
