import types from './types';
import urls from './urls';
import request from '@/utils/request';

export default {
  test: ({ commit, state }, data) => {
    request.get(urls.test).then(res => {
      console.log('测试请求成功:', res);
    }).catch(err => {
      console.log('测试请求出错:', err);
    })
  },
  getMenu: ({ commit, state }, data) => {
    return new Promise(resolve => {
      console.log('获取菜单路由')
      let res = [{
        path: "/index",
        name: "index",
        component: "index",
        children: [{
          path: "/",
          name: "Dashboard",
          component: "Dashboard",
        }]
      }];
      commit(types.SET_MENU, res);
      resolve(res);
    });
  }
}