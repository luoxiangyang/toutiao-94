import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'
import ElementUI from 'element-ui'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import '@/styles/index.less'
import Component from '@/components'

Vue.config.productionTip = false
Vue.use(Component)
Vue.use(ElementUI) // 全局注册
// Vue.use() 会调用ElementUI对象的一个方法  install方法传入当前VUe对象
// 配置axios得baseURl
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 将axios赋值给vue全局对象的原型属性
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
