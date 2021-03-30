// 把除了Entry和Dashboard以外所有页面引入此处

import store from '../store'
import router from '@/router'

import Error from '@/pages/Error'

import index from '@/pages'

let systemRouter;

export async function createDynamicRouter(to, next, aim) {
  // 用store请求得到路由表单
  // 根据路由表单生成路由对象，并放入缓存 / Vuex
  if (systemRouter) {
    if (aim) next({ path: aim });
    else next();
  } else {
    let systemRouterStr = [{
      path: '*',
      name: 'error',
      component: 'Error',
      children: [{
        path: '/Error404',
        name: 'Error404',
        component: 'Error404',
      },
      ]
    }];
    await store.dispatch('global/getMenu').then(res => {
      console.log('获取路由成功');
      res.forEach(e => {
        systemRouterStr.push(e);
      });
      systemRouter = systemRouterStr;
      routerNext(to, next);
    }).catch(err => {
      console.log('获取路由出错', err);
    });
  }
}

export function resetSystemRouter() {
  systemRouter = undefined;
}

function routerNext(to, next) {
  const realRouter = routerFilter(systemRouter);
  realRouter.forEach((e) => {
    router.addRoute(e);
  });
  next({
    ...to,
    // replace用于防止addRoutes时，按返回按钮导致路由混乱
    replace: true
  });
}

// 组件动态路由对象
function routerFilter(routerMap, isChild = false, parents = []) {
  const accessRouters = routerMap.filter(route => {
    let _parents = [...parents];
    if (typeof (route.component) == 'string') {
      let componentName = route.component;
      if (route.component) {
        switch (route.component) {
          case 'index':
            route.component = index;
            break;
          case 'Error':
            route.component = Error;
            _parents.push(componentName);
            break;
          default:
            if (parents.length == 0) {
              let path = `/${route.component}`;
              route.component = () => import(`@/pages${path}`);
            } else {
              let path = `/${parents.join('/')}/${route.component}`;
              route.component = () => import(`@/pages${path}`);
            }
            if (isChild) parents.push(componentName);
            break;
        }
      }
    }
    if (route.children && route.children.length) {
      route.children = routerFilter(route.children, true, [..._parents]);
    }
    return true;
  });
  return accessRouters;
}