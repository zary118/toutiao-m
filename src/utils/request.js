import axios from 'axios'
import store from '@/store'
// import router from '../router'

const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net'
  // baseURL: 'http://ttapi.research.itcast.cn/'
})

// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 请求发送前
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  // 处理请求错误
  return Promise.reject(error)
})

// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 2xx范围内的任何状态代码都会触发此函数
  // 处理相应数据
  return response
}, function (error) {
  //  超出2xx范围的状态码都会触发此函数
  // 处理响应错误
  return Promise.reject(error)
})

// 导出
export default request
