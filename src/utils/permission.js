import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
// import getPageTitle from '@/utils/get-page-title'

// console.log(process.env)
NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist



let getMessages = () => {
  // 获取系统消息列表
  store.dispatch('user/getMessages', { pageIndex: 1, pageSize: 10, queryTime: (new Date()).getTime() })
  // 设置系统消息定时任务
  window.msgTimeout = setInterval(() => {
    store.dispatch('user/getMessages', { pageIndex: 1, pageSize: 10, queryTime: (new Date()).getTime() });
  }, 1000 * 30)
}

router.beforeEach(async (to, from, next) => {
  NProgress.start()
  console.log('跳转title', to.meta)
  // document.title = getPageTitle(to.meta.title)
  // determine whether the user has logged in
  const hasToken = getToken()

  if (window.msgTimeout) clearInterval(window.msgTimeout)
  if (hasToken) {
    // 二级路由signup待确认
    console.log('跳转目标', to.path)
    if (to.path === '/login' || to.path === '/signup') {
      getMessages()
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasGetUserInfo = store.getters.name
      if (hasGetUserInfo) {
        getMessages()
        next()
      } else {
        try {
          // get user info
          await store.dispatch('user/getInfo')
          getMessages()
          next()
        } catch (error) {
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/
    if (window.msgTimeout) clearInterval(window.msgTimeout)
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      if (to.path === '/signup') next()
      else next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
