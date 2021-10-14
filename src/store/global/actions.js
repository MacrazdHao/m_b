import types from './types';
import urls from './urls';
import request from '../../utils/request';
import * as cookie from 'js-cookie';
import config from '@/utils/config';

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
      if (process.env.NODE_ENV == "development") {
        console.log('获取菜单路由')
        let res = [{
          path: '/index',
          children: [
            {
              path: '/dashboard',
              children: [{
                path: '/schoolDashboard'
              }, {
                path: '/adminDashboard'
              }, {
                path: '/studentDashboard'
              }, {
                path: '/consultantDashboard'
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
                path: "/courseDetail",
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
              }, {
                path: "/templateList",
              }, {
                path: "/templateAllocate",
              }]
            }, {
              path: '/modules',
              children: [{
                path: '/modulelist',
              }, {
                path: '/editModule',
              }]
            }, {
              path: '/consultant'
            }, {
              path: '/estuary',
              children: [{
                path: '/estuaryStudents',
              }, {
                path: '/estuaryRecords',
              }]
            }, {
              path: '/estuaryConsultant'
            }, {
              path: '/estuaryStudent',
              children: [{
                path: '/estuaryStudentBase',
              }, {
                path: '/estuaryStudentLive',
              }]
            }, {
              path: '/playback'
            }, {
              path: "/testing",
              children: [{
                path: "/testing1",
              }, {
                path: "/testing2",
              }]
            },]
        }, {
          path: '/living'
        }, {
          path: '/estuaryLiving'
        }, {
          path: '/reportModule'
        }]
        commit(types.SET_MENU, res);
        resolve(res);
      } else {
        request.get(urls.getMenu).then(res2 => {
          console.log('获取路由', res2)
          commit(types.SET_MENU, res2.data);
          resolve(res2.data);
        });
      }
    });
  },
  setMenu: ({ commit, state }, data) => {
    commit(types.SET_MENU, data);
  },
  resetMenu: ({ commit, state }) => {
    commit(types.RESET_MENU);
  },
  setLanguage: ({ commit, state }, language) => {
    cookie.set("myfellaslanguagekey", language);
    commit('SET_LANGUAGE', language);
    window.location.reload();
  },
  uploadAvatar: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.uploadAvatar, data, { "Content-Type": "multipart/form-data" }).then(res => {
        if (res.data.url) {
          res.data.url = res.data.url;
        }
        console.log(request.custom)
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    });
  },
  setPhoneVCodeSeconds: ({ commit, state }, seconds) => {
    return new Promise((resolve, reject) => {
      commit(types.SET_PHONE_VCODE_SECONDS, seconds);
      resolve(seconds);
    })
  },
  setEmailVCodeSeconds: ({ commit, state }, seconds) => {
    return new Promise((resolve, reject) => {
      commit(types.SET_EMAIL_VCODE_SECONDS, seconds);
      resolve(seconds);
    });
  },
  getHtmlContent: ({ commit, state }, url) => {
    return new Promise((resolve, reject) => {
      fetch(config.ossURL + url).then(res => {
        console.log('获取富文本成功', res);
        resolve(res.text());
      }).catch(err => {
        console.log('获取富文本失败', err);
        reject(err)
      });
    });
  },
}