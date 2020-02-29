import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'// 引入样式
import '@/styles/index.less'
Vue.config.productionTip = false
Vue.use(ElementUI) // 全局注册
// Vue.use() 会调用ElementUI对象的一个方法  install方法传入当前VUe对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
