import mockRequests from "@/api/mockRequest"
import requests from "@/api/request"

//首页商家导航
export const reqNavigation=()=>requests.get('/getNavigation')
//首页地址信息
export const reqLocation=()=>requests.get('/getLocation')
//首页商家列表
export const reqShops=()=>requests.get('/getShop')
//获取验证码
export const reqCaptcha=(phone)=>requests({
  url:`/users/sendCode?phone=${phone}`,
  method:'POST',
})
//登录并获取用户信息
export const reqLogin=(phone,code)=>requests({
  url:`/users/loginWithPhoneAndCode?phone=${phone}&code=${code}`,
  method:'POST',
})
//获取已登录用户的信息
export const reqUserInfo=(token)=>requests({
  url:`/users/getUserInfo?token=${token}`,
  method:'POST',
})
//获取商家商品
export const reqShopDetail=()=>mockRequests.get('/shopDetail')
//获取互帮互助列表
export const reqHelperList=()=>requests.get('/getHelperList')
//获取教育超市商品列表
export const reqEducationSupermarketDetail=()=>mockRequests.get('/educationSupermarketDetail')
