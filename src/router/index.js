import Vue from 'vue'
import Router from 'vue-router'

import entry from '@/pages/Entry'
import login from '@/pages/Entry/pages/login'
import register from '@/pages/Entry/pages/register'
import forget from '@/pages/Entry/pages/forget'

import Error from '@/pages/Error'
import Error404 from '@/pages/Error/404'

import index from '@/pages'
import dashboard from '@/pages/Dashboard'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
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
    },{
      path: '*',
      name: 'error',
      component: Error,
      children: [{
        path: '/',
        name: '404',
        component: Error404,
      },
      ]
    }
  ]
})
