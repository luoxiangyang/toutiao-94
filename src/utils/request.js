// 封装请求工具
import axios from 'axios'

axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'

// 请求拦截
axios.interceptors.request.use(function (config) {
  // 成功执行第一个 有一个参数config  就是所有的axios的请求信息
  const token = localStorage.getItem('user-token')
  config.headers.Authorization = `Bearer ${token}`
  return config
},
function (error) {
  // 失败执行第二个 axios支持promise 如果失败 reject
  return Promise.reject(error)
})
axios.interceptors.response.use(function (response) {
  // 这里在相应拦截器中需要将数据返回
  return response.data ? response.data : {}
},
function () { })
export default axios
