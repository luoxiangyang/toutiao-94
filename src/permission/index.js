import router from '@/router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
router.beforeEach(function (to, from, next) {
  // 开启进度条
  progress.start()
  // next()// 表示放过
  // next(false)表示全部不通过
  // next(地址) 表示去一个新地址
  // 判断 是不是以/home为开头
  if (to.path.startsWith('/home')) {
    const token = window.localStorage.getItem('user-token')
    if (token) {
      next() // 有令牌直接放过
    } else {
      next('/login') // 否则去登录页
    }
  } else {
    next()
  }
})
// 全局后置守卫关闭
router.afterEach(() => {
  progress.done()
})
