import axios from "axios"
import nprogress from "nprogress"
import 'nprogress/nprogress.css'

const requests=axios.create({
  //基础路径
  baseURL:'/api',
  //超时时间
  timeout:5000,
})


requests.interceptors.request.use(
  (config)=>{
    nprogress.start()
    return config
  },
)

requests.interceptors.response.use(
  (res)=>{
    nprogress.done()
    return res.data
  },
  (err)=>{
    nprogress.done()
    return Promise.reject(new Error(err.message))
  },
)


export default requests
