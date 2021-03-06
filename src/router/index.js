import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/home'
import Login from '@/views/login'
import Secondhome from '../views/home/secondhome.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '*', // 匹配任何找不到组件的路由
    component: () => import('@/views/404')
  },
  {
    path: '/',
    redirect: '/home'// 跳转到home组件
  },
  {
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '', // 二级路由 如果什么都不写表示默认组件
      component: Secondhome,
      children: [{
        path: '',
        component: () => import('@/views/home/Thirdhome.vue')
      }]
    }, {
      path: 'comment',
      component: () => import('@/views/comment')
    }, {
      path: 'material',
      component: () => import('@/views/material')
    }, {
      path: 'articles',
      component: () => import('@/views/articles')
    }, {
      path: 'publish/:articleId?',
      component: () => import('@/views/publish')
    }, {
      path: 'account',
      component: () => import('@/views/account')
    }]
  },
  {
    path: '/login',
    component: Login,
    name: 'Login'
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
