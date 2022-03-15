import {reqEducationSupermarketDetail} from "@/api"
import Vue from "vue"

const state={
  goods:[],
  info:{},
  goodsInCart:[],
}

const mutations={
  /*
  所有mutations、actions、getters的命名不能重复，即使它们不在同一个小仓库里。
  否则会引起调用问题，比如这个的count永远为undefined，在json中添加相应键值对也没用。
  但state没这问题，因为state后还有一个[小仓库名]做标识。
  */
  GETEDUCATIONSUPERMARKETINFO(state,info){
    state.info=info
  },
  GETEDUCATIONSUPERMARKETGOODS(state,goods){
    state.goods=goods
  },
  ADDCOUNTOFGOOD(state,{good}){
    if(!good.count){
      //增加购买数量
      Vue.set(good,"count",1)
      //加入购物车
      state.goodsInCart.push(good)
    }else{
      good.count++
    }
  },
  MINUSCOUNTOFGOOD(state,{good}){
    if(good.count>=1){
      //减少购买数量
      good.count--
    }else{
      //防止多次点击出现读负数或出现负数后点击无反应
      good.count=0
    }
    if(good.count<=0){
      //从购物车移除
      state.goodsInCart.splice(state.goodsInCart.indexOf(good),1)
    }
  },
  CLEARCART2(state){
    state.goodsInCart.forEach((good)=>good.count=0)
    state.goodsInCart=[]
  },
}

const actions={
  async getEducationSupermarketInfo({commit}){
    let result=await reqEducationSupermarketDetail()
    if(200==result.code) commit('GETEDUCATIONSUPERMARKETINFO',result.data.info)
  },
  async getEducationSupermarketGoods({commit},callback){
    let result=await reqEducationSupermarketDetail()
    if(200==result.code) commit('GETEDUCATIONSUPERMARKETGOODS',result.data.goods)
    callback && callback()
  },
  updateCountOfGood({commit},{flag,good}){
    if(flag){
      commit("ADDCOUNTOFGOOD",{good})
    }else{
      commit("MINUSCOUNTOFGOOD",{good})
    }
  },
  clearCart2({commit}){
    commit('CLEARCART2')
  },
}

const getters={
  totalCount2(state){
    return state.goodsInCart.reduce((pre,good)=>pre+good.count,0)
  },
  totalPrice2(state){
    let result=state.goodsInCart.reduce((pre,good)=>pre+good.count*good.price,0)

    if(result%1==0) return result
    else return parseFloat(result).toFixed(2)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
