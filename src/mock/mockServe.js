import Mock from 'mockjs'
//import location from './location.json'
import navigation from './navigation.json'
//import shops from './shops.json'
//import userInfo from './userInfo.json'
import shopDetail from './shopDetail.json'
import helperList from './helperList.json'
import educationSupermarketDetail from './educationSupermarketDetail.json'

//Mock.mock('/mock/location',{code:200,data:location})
Mock.mock('/mock/navigation',{code:200,data:navigation})
//Mock.mock('/mock/shops',{code:200,data:shops})
//Mock.mock('/mock/userInfo',{code:200,data:userInfo})
Mock.mock('/mock/shopDetail',{code:200,data:shopDetail})
Mock.mock('/mock/helperList',{code:200,data:helperList})
Mock.mock('/mock/educationSupermarketDetail',{code:200,data:educationSupermarketDetail})
