import {reqLogin,reqCaptcha,reqUserInfo} from "@/api"

const state={
  userInfo:{},
}

const mutations={
  SETUSERINFO(state,data){
    state.userInfo=data
    localStorage.setItem('token',data.uuid)
  },
  CLEARUSERINFO(state){
    state.userInfo={}
  },
}

const actions={
  //获取验证码
  //调试日记  2022-02-20
  //  1.无论是否用到commit，都需要在形参中注明{commit}，否则会导致传入的data变成undefined，进而产生api请求问题。
  //  2.形参命名要和dispatch传入的参数命名一致，否则也会导致undefined；或者直接用一个data表示所有传入参数的对象。
  async getCaptcha({commit},{phone}){
    let result=await reqCaptcha(phone)
    if(200==result.code) alert('您正在使用验证码登录[金狐外卖]，验证码为：'+result.data+'。')
    else alert(result.msg+result.data)
  },
  async getLogin({commit},{phone,code}){
    //调试日记  2022-02-20
    //  1.要想返回dispatch的结果，只能使用promise函数。因为它本身的结果就是promise，不能直接return。
    let result=await reqLogin(phone,code)

    if(200==result.code){
      commit('SETUSERINFO',result.data)
      return Promise.resolve()
    }else return Promise.reject(new Error(result.msg))
  },
  getUserInfo({commit},{token}){
    let result=reqUserInfo(token)

    if(200==result){
      commit('SETUSERINFO',result.data[0])
    }
  },
  clearUserInfo({commit}){
    commit('CLEARUSERINFO')
  },
}

const getters={}

export default {state,mutations,actions,getters}
