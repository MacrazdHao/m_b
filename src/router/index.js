import Vue from 'vue'
import Router from 'vue-router'

import staticRouter from './staticRouter';

Vue.use(Router)

// 防止Avoided redundant navigation to current location错误
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: staticRouter
})
