import Mock from 'mockjs'
import navigation from './navigation.json'
import shopDetail from './shopDetail.json'
import helperList from './helperList.json'
import educationSupermarketDetail from './educationSupermarketDetail.json'
import orderList from './orderList.json'

Mock.mock('/mock/navigation', {code: 200, data: navigation})
Mock.mock('/mock/shopDetail', {code: 200, data: shopDetail})
Mock.mock('/mock/helperList', {code: 200, data: helperList})
Mock.mock('/mock/educationSupermarketDetail', {code: 200, data: educationSupermarketDetail})
Mock.mock('/mock/orderList', {code: 200, data: orderList})
