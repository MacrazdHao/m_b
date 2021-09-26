import router from '../router'
import { createDynamicRouter, resetSystemRouter } from './dynamic'
import store from '../store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// console.log(process.env)
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/', '/login', '/register', '/register2', '/forget', '/reset', '/contact', '/parents', '/adminEntry'] // no redirect whitelist

let getMessages = () => {
  if (window.msgTimeout) clearInterval(window.msgTimeout)
  // console.log('正在执行')
  // 获取系统消息列表
  store.dispatch('user/getUnreadNum')
  // 设置系统消息定时任务
  window.msgTimeout = setInterval(() => {
    store.dispatch('user/getUnreadNum')
  }, 1000 * 30)
}

router.beforeEach(async (to, from, next) => {
  let query = to.query;
  if (query.lang && query.lang != store.state.global.language) store.dispatch("global/setLanguage", query.lang)
  NProgress.start()
  // console.log('跳转title', to.meta)
  // document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()

  if (window.msgTimeout) clearInterval(window.msgTimeout)
  // 是否存在token（已登录）
  if (hasToken) {
    // 已登录
    // 当前页面是否为后台入口相关页面
    if (whiteList.indexOf(to.path) !== -1) {
      // 当前页面是后台入口相关页面时
      // 生成动态路由
      // 获取系统消息
      getMessages()
      createDynamicRouter(to, next, '/index')
      NProgress.done()
    } else {
      // console.log(store.state.user.userinfo)
      // 当前页面不是后台入口相关页面时
      const hasGetUserInfo = store.state.user.userinfo
      // 是否以获取用户信息
      if (hasGetUserInfo) {
        // 已获取用户信息
        // getMessages()
        // 组建动态路由
        createDynamicRouter(to, next)
      } else {
        // 未获取用户信息
        try {
          // 获取用户信息
          await store.dispatch('user/getUserinfo').then(res => {
            getMessages()
            // 组建动态路由
            createDynamicRouter(to, next)
          });
        } catch (error) {
          // 获取用户信息失败
          resetSystemRouter()
          // 清空Token（重置user.state）
          await store.dispatch('user/resetToken')
          // 跳回至后台入口
          next(`?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    // 未登录
    resetSystemRouter()
    // 清空系统消息定时任务
    if (window.msgTimeout) clearInterval(window.msgTimeout)
    if (whiteList.indexOf(to.path) !== -1) {
      // 要跳转的页面在白名单内（未登录也能进入的页面）则直接跳转
      next()
      NProgress.done()
    } else {
      // 不在白名单内，跳至后台入口
      next(`?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})