import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import career from '@/components/career'
import about from '@/components/about'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
    {
      path: '/career',
      name: 'career',
      component: career
    },
    {
      path: '/about',
      name: 'about',
      component: about
    },
  ]
})
