import Vue from 'vue';
import Router from 'vue-router';
import router from '@/router';
import staticRouter from './staticRouter';

export function resetRouter() {
  const newRouter = new Router({
    routes: staticRouter
  });
  router.matcher = newRouter.matcher;
}