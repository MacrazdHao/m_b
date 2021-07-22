import types from './types';
import urls from './urls';
import request from '../../utils/request';

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
        path: '/index',
        children: [
          {
            path: '/dashboard',
            children: [{
              path: '/schoolDashboard'
            },{
              path: '/adminDashboard'
            },{
              path: '/studentDashboard'
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
              path: "/studentBase",
            }, {
              path: "/schoolBase",
            }, {
              path: "/consultantBase",
            }, {
              path: "/adminBase",
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
              path: "/accountlist",
            }, {
              path: "/adminaccountlist",
            }, {
              path: "/schoolaccountlist",
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
      // request.get(urls.getMenu).then(res2 => {
      //   console.log('获取路由', res2)
      //   commit(types.SET_MENU, res2.data);
      //   resolve(res2.data);
      // });
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
  uploadAvatar: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.uploadAvatar, data, { "Content-Type": "multipart/form-data" }).then(res => {
        if (res.data.url) {
          res.data.url = request.custom.ossUrl + res.data.url;
        }
        console.log(request.custom)
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  }
}