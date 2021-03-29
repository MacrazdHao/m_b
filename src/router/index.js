import Vue from 'vue'
import Router from 'vue-router'
import entry from '@/pages/Entry'
import login from '@/pages/Entry/pages/login'
import register from '@/pages/Entry/pages/register'
import forget from '@/pages/Entry/pages/forget'

import index from '@/pages'
import dashboard from '@/pages/dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'entry',
      component: entry,
      children: [{
        path: '/',
        name: 'login',
        component: login,
      }, {
        path: '/register',
        name: 'register',
        component: register,
      }, {
        path: '/forget',
        name: 'forget',
        component: forget,
      }]
    }, {
      path: '/index',
      name: 'index',
      component: index,
      children: [{
        path: '/',
        name: 'dashboard',
        component: dashboard,
      },
        // 此处菜单需做动态权限管理
      ]
    }
  ]
})
