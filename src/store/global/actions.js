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
          children: [
            {
              path: '/dashboard',
              children: [{
                path: '/schoolDashboard'
              }, {
                path: '/schedules'
              }]
            }, {
              path: '/counseling',
              children: [{
                path: '/baseInfo',
              }, {
                path: '/onlineTest',
              }, {
                path: '/consultLive',
                meta: { step: 4 }
              }, {
                path: '/getReport',
              }]
            }, {
              path: '/knowledge'
            }, {
              path: '/students',
              children: [{
                path: '/studentsList'
              }, {
                path: '/studentsDetail'
              }, {
                path: '/studentsProcess'
              }]
            }, {
              path: '/archives',
              children: [{
                path: '/archivesList'
              }, {
                path: '/archivesDetail'
              }]
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
                path: "/abase",
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
                path: "/schoolaccount",
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
              path: '/files',
              children: [{
                path: '/filesList'
              }, {
                path: '/filesDetail'
              }]
            },
            {
              path: "/management",
              children: [{
                path: "/counselinglist",
              }, {
                path: "/counselingDetail",
              }, {
                path: "/careerlist",
              }, {
                path: "/careerDetail",
              }, {
                path: "/courselist",
              }, {
                path: "/adviselist",
              }]
            },
            {
              path: "/school",
              children: [{
                path: "/schoollist",
              }, {
                path: "/student",
              }, {
                path: "/sdetail",
              }]
            }, {
              path: '/consultant'
            }, {
              path: '/playback'
            }, {
              path: "/testing",
              children: [{
                path: "/testing1",
              }]
            },]
        }, {
          path: '/living'
        }]
      };
      request.get(urls.getMenu).then(res2 => {
        console.log('获取路由', res2)
        commit(types.SET_MENU, res2.data);
        resolve(res2.data);
      });
      // commit(types.SET_MENU, res);
      // resolve(res);
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