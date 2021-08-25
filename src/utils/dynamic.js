// 把除了Entry和Dashboard以外所有页面引入此处
import Vue from 'vue';
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

// console.log('测试', res);

let systemRouter;

export async function createDynamicRouter(to, next, aim) {
  const hasRouter = store.state.global.menu
  // 用store请求得到路由表单
  // 根据路由表单生成路由对象，并放入缓存 / Vuex
  if (systemRouter || hasRouter) {
    if (aim) next({ path: aim });
    else next();
  } else {
    Vue.prototype.$loading.show();
    let systemRouterStr2 = [{
      path: '/error',
      children: [{
        path: '/404',
      }]
    }];
    await store.dispatch('global/getMenu').then(res => {
      console.log('获取路由成功');
      res.forEach(e => {
        systemRouterStr2.push(e);
      });
      systemRouter = systemRouterStr2;
      routerNext(to, next);
      Vue.prototype.$loading.hide();
    }).catch(err => {
      console.log('获取路由出错', err);
      Vue.prototype.$loading.hide();
    });
  }
}

export async function resetSystemRouter() {
  systemRouter = undefined;
  await store.dispatch('global/resetMenu');
}

function routerNext(to, next) {
  const realRouter = routerFilter(systemRouter);
  console.log('组建完成', realRouter)
  store.dispatch('global/setMenu', realRouter[1]);
  realRouter.forEach((e) => {
    router.addRoute(e);
  });
  next({
    ...to,
    // replace用于防止addRoutes时，按返回按钮导致路由混乱
    replace: true
  });
}

// 路由id
var idNum = 0;
// 组件动态路由对象
function routerFilter(routerMap, isChild = false, parents = []) {
  const accessRouters = routerMap.filter(route => {
    let _parents = [...parents];
    // console.log(parents);
    // 构建Vue-Router路由对象
    for (let key in routerMapping[route.path]) {
      if (key == 'path' || key == 'redirect') continue;
      if (key == 'meta') {
        // console.log(route)
        route[key] = { id: idNum++, notShowChildren: false, ...routerMapping[route.path][key], ...route.meta };
        continue;
      }
      route[key] = routerMapping[route.path][key];
    }
    if (route.children) {
      // 如果有子页面，则指定重定向到第一个子页面
      route['redirect'] = routerMapping[route.children[0].path].name;
    }
    // console.log(route);
    // 从路由映射表获取出本地页面(组件)对象路径
    route.path = routerMapping[route.path].path;
    if (typeof (route.component) == 'string') {
      // console.log(route)
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
              // console.log(import(`@/pages${path}`))
            } else {
              let path = `/${parents.join('/')}/${route.component}`;
              let path2 = `/${route.component}`;
              route.component = () => {
                // 载入相应页面的index.vue
                return new Promise((resolve, reject) => {
                  import(`@/pages${path}`).then((res) => {
                    resolve(res)
                  }).catch(() => {
                    // 子目录中不存在，则从根目录寻找
                    import(`@/pages${path2}`).then((res2) => {
                      resolve(res2)
                    }).catch(() => {
                      reject(-1);
                      // 添加默认指向
                    })
                  })
                });
              }
            }
            // 叠加父级路由路径
            if (isChild) _parents.push(componentName);
            break;
        }
      }
    }
    if (route.children && route.children.length) {
      if (route.name != "error") {
        let _children = routerFilter(route.children, true, [..._parents]);
        route.children = [{ path: "", redirect: _children[0].path }, ..._children];
      } else {
        // 递归深度遍历
        route.children = routerFilter(route.children, true, [..._parents]);
      }
    }
    // console.log(route)
    return true;
  });
  return accessRouters;
}