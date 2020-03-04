// 使用Vue.use方法注册
import LayoutHeader from './home/layout-header.vue'
import LayoutAside from './home/layout-aside.vue'
export default {
  install: function (Vue) {
    // 注册组件
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
  }
}
