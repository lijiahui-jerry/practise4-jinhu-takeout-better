import {reqShopDetail} from "@/api"
import Vue from "vue"

const state={
  goods:[],
  info:{},
  ratings:[],
  foodsInCart:[],
}

const mutations={
  GETSHOPDETAIL(state,shopDetail){
    state.info=shopDetail.info
  },
  GETSHOPGOODS(state,shopGoods){
    state.goods=shopGoods
  },
  GETSHOPRATINGS(state,shopRatings){
    state.ratings=shopRatings
  },
  ADDCOUNTOFFOOD(state,{food}){
    if(!food.count){
      //增加购买数量
      Vue.set(food,"count",1)
      //加入购物车
      state.foodsInCart.push(food)
    }else{
      food.count++
    }
  },
  MINUSCOUNTOFFOOD(state,{food}){
    if(food.count>=1){
      //减少购买数量
      food.count--
    }else{
      //防止多次点击出现读负数或出现负数后点击无反应
      food.count=0
    }
    if(food.count<=0){
      //从购物车移除
      state.foodsInCart.splice(state.foodsInCart.indexOf(food),1)
    }
  },
  CLEARCART(state){
    state.foodsInCart.forEach((food)=>food.count=0)
    state.foodsInCart=[]
  },
}

const actions={
  async getShopDetail({commit}){
    let result=await reqShopDetail()
    if(200==result.code) commit('GETSHOPDETAIL',result.data)
  },
  async getShopGoods({commit},callback){
    let result=await reqShopDetail()
    if(200==result.code) commit('GETSHOPGOODS',result.data.goods)
    callback && callback()
  },
  async getShopRatings({commit},callback){
    let result=await reqShopDetail()
    if(200==result.code) commit('GETSHOPRATINGS',result.data.ratings)
    callback && callback()
  },
  updateCountOfFood({commit},{flag,food}){
    if(flag){
      commit("ADDCOUNTOFFOOD",{food})
    }else{
      commit("MINUSCOUNTOFFOOD",{food})
    }
  },
  clearCart({commit}){
    commit('CLEARCART')
  },
}

const getters={
  totalCount(state){
    return state.foodsInCart.reduce((preTotal,food)=>preTotal+food.count,0)
  },
  totalPrice(state){
    //调试日记  2022-02-14
    //  1.浮点运算可能出现小数点后面很多位的极小小数，需要根据需求保留数位。
    let result=state.foodsInCart.reduce((pre,food)=>pre+food.count*food.price,0)

    if(result%1==0) return result
    else return parseFloat(result).toFixed(2)
  },
  thumbsUpCount(state){
    return state.ratings.reduce((preTotal,rating)=>preTotal+(rating.thumbsUp?1:0),0)
  },
}

export default {state,mutations,actions,getters}
