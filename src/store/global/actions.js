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
      let res = {
        way1: [{
          path: '/index',
          children: [{
            path: '/dashboard'
          }, {
            path: '/counseling'
          }, {
            path: '/knowledge'
          }, {
            path: '/students'
          }, {
            path: '/archives'
          }, {
            path: '/messages'
          }, {
            path: "/personal",
            children: [{
              path: "/base",
            }, {
              path: "/sbase",
            }, {
              path: "/cbase",
            }, {
              path: "/account",
            }, {
              path: "/safe",
            }]
          }, {
            path: "/accounts",
            children: [{
              path: "/admin",
            }, {
              path: "/teacher",
            }, {
              path: "/acountlist",
            }, {
              path: "/invitation",
            }]
          }, {
            path: '/live'
          }, {
            path: '/files'
          }, {
            path: "/management",
            children: [{
              path: "/counselinglist",
            }, {
              path: "/careerlist",
            }, {
              path: "/courselist",
            }, {
              path: "/adviselist",
            }]
          }, {
            path: "/school",
            children: [{
              path: "/schoollist",
            }, {
              path: "/student",
            }, {
              path: "/sdetail",
            }]
          }, {
            path: "/testing",
            children: [{
              path: "/testing1",
            }, {
              path: "/counseling",
            }]
          },]
        }, {
          path: '/living'
        }]
      };
      commit(types.SET_MENU, res);
      resolve(res);
    });
  },
  setMenu: ({ commit, state }, data) => {
    commit(types.SET_MENU, data);
  },
  resetMenu: ({ commit, state }) => {
    commit(types.RESET_MENU);
  },
  setLanguage: ({ commit, state }, language) => {
    commit('SET_LANGUAGE', language);
  },
}