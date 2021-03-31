// 把除了Entry和Dashboard以外所有页面引入此处

import store from '../store'
import router from '@/router'
import routerMapping from './routerMapping'

import Error from '@/pages/Error'

import index from '@/pages'

let test = [{
  a: 999
}, {
  a: 999
}, {
  a: 999
}];

let test2 = [{
  b: 0,
  c: 10
}, {
  b: 1,
  c: 11
}, {
  b: 2,
  c: 12
}]

let res = test.filter((val, index) => {
  // val = { ...test2 }  // 赋值失败
  val.b = test2[index].b;  // 赋值成功
  val.c = test2[index].c;  // 赋值成功
  return true;
});

console.log('测试', res);

let systemRouter;

export async function createDynamicRouter(to, next, aim) {
  // 用store请求得到路由表单
  // 根据路由表单生成路由对象，并放入缓存 / Vuex
  if (systemRouter) {
    if (aim) next({ path: aim });
    else next();
  } else {
    let systemRouterStr2 = [{
      path: '/error',
      children: [{
        path: '/404',
      }]
    }];
    await store.dispatch('global/getMenu').then(res => {
      console.log('获取路由成功');
      res.way1.forEach(e => {
        systemRouterStr2.push(e);
      });
      systemRouter = systemRouterStr2;
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
  console.log('组建完成', realRouter)
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
    for (let key in routerMapping[route.path]) {
      if (key == 'path') continue;
      route[key] = routerMapping[route.path][key];
    }
    route.path = routerMapping[route.path].path;
    if (typeof (route.component) == 'string') {
      console.log(route)
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
    // console.log(route)
    return true;
  });
  return accessRouters;
}