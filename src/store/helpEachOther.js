import {reqHelperList} from "@/api"

const state={
  helperList:[],
}

const mutations={
  GETHELPERLIST(state,helperList){
    state.helperList=helperList
  },
}

const actions={
  async getHelperList({commit}){
    let result=await reqHelperList()
    if(200==result.code){
      commit('GETHELPERLIST',result.data)
    }
  },
}

const getters={
}

export default {
  state,
  mutations,
  actions,
  getters,
}
