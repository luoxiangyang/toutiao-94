// 使用Vue.use方法注册
import LayoutHeader from './home/layout-header.vue'
import LayoutAside from './home/layout-aside.vue'
import BreadCrumb from './common/bread-crumb.vue'
import VueQuillEditor from 'vue-quill-editor'
import coverImage from './publish/cover-image.vue'
import SelectImage from './publish/select-image.vue'
// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
  install: function (Vue) {
    // 注册组件
    Vue.component('layout-header', LayoutHeader)
    Vue.component('layout-aside', LayoutAside)
    Vue.component('bread-crumb', BreadCrumb)
    Vue.use(VueQuillEditor)
    Vue.component('cover-image', coverImage)
    Vue.component('select-image', SelectImage)
  }
}
