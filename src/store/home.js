import {reqNavigation,reqLocation,reqShops} from "@/api"

const state={
  school:{},
  navigation:[],
  shops:[],
}

const mutations={
  GETLOCATION(state,school){
    state.school=school[0]
  },
  GETNAVIGATION(state,navigation){
    state.navigation=navigation
  },
  GETSHOPS(state,shops){
    state.shops=shops
  },
}

const actions={
  //获取地址信息
  async getLocation({commit}){
    let result=await reqLocation()
    if(200==result.code) commit('GETLOCATION',result.data)
  },
  //获取首页商家导航
  async getNavigation({commit}){
    let result=await reqNavigation()
    if(200==result.code) commit("GETNAVIGATION",result.data)
  },
  //获取商家列表
  async getShops({commit}){
    let result=await reqShops()
    if(200==result.code) commit('GETSHOPS',result.data)
  },
}

const getters={}

export default {state,mutations,actions,getters}
