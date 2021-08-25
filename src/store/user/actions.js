import Vue from 'vue';
import types from './types';
import urls from './urls';
import request from '../../utils/request';
import { setToken, removeToken, setUsertype, getUsertype, removeUsertype } from '@/utils/auth';
import { resetRouter } from '@/router/resetRouter';
import Enum from '@/utils/enum';

export default {
  schoolLogin: ({ commit, state }, data) => {
    Vue.prototype.$loading.show();
    return new Promise((resolve, reject) => {
      request.post(urls.schoolLogin, data).then(res => {
        console.log('登陆成功', res);
        setToken(res.data.token);
        setUsertype(Enum.getLocalUserType(res.data.userType));
        Vue.prototype.$loading.hide();
        resolve(res);
      }).catch(err => {
        console.log('登录失败', err);
        Vue.prototype.$loading.hide();
        reject(err);
      });
    });
  },
  studentLogin: ({ commit, state }, data) => {
    Vue.prototype.$loading.show();
    return new Promise((resolve, reject) => {
      request.post(urls.studentLogin, data).then(res => {
        console.log('登陆成功', res);
        setToken(res.data.token);
        setUsertype(Enum.getLocalUserType(res.data.userType));
        Vue.prototype.$loading.hide();
        resolve(res);
      }).catch(err => {
        console.log('登录失败', err);
        Vue.prototype.$loading.hide();
        reject(err);
      });
    });
  },
  consultantLogin: ({ commit }, data) => {
    Vue.prototype.$loading.show();
    return new Promise((resolve, reject) => {
      request.post(urls.consultantLogin, data).then(res => {
        console.log('登陆成功', res);
        setToken(res.data.token);
        setUsertype(Enum.getLocalUserType(res.data.userType));
        Vue.prototype.$loading.hide();
        resolve(res);
      }).catch(err => {
        console.log('登录失败', err);
        Vue.prototype.$loading.hide();
        reject(err);
      });
    });
  },
  adminLogin: ({ commit }, data) => {
    Vue.prototype.$loading.show();
    return new Promise((resolve, reject) => {
      request.post(urls.adminLogin, data).then(res => {
        console.log('登陆成功', res);
        setToken(res.data.token);
        setUsertype(Enum.getLocalUserType(res.data.userType));
        Vue.prototype.$loading.hide();
        resolve(res);
      }).catch(err => {
        console.log('登录失败', err);
        Vue.prototype.$loading.hide();
        reject(err);
      });
    });
  },
  getUserinfo: ({ commit, state }, data) => {
    Vue.prototype.$loading.show();
    // console.log("用户类型", getUsertype());
    let iUrl = getUsertype() < 10 ? urls.userinfo : urls.admininfo;
    return new Promise((resolve, reject) => {
      request.get(iUrl, data).then(res => {
        console.log('获取用户信息成功', res);
        res.data.userType = Enum.getLocalUserType(res.data.userType);
        commit(types.SET_USERINFO, res.data);
        Vue.prototype.$loading.hide();
        resolve(res);
      }).catch(err => {
        console.log('获取用户信息失败', err);
        Vue.prototype.$loading.hide();
        reject(err);
      });
    });
  },
  logout: ({ commit, state }) => {
    Vue.prototype.$loading.show();
    let type = getUsertype();
    console.log(type)
    return new Promise((resolve, reject) => {
      request.post(type >= 10 ? urls.adminLogout : urls.logout).then(res => {
        console.log('登出成功', res);
        resetRouter();
        removeToken();
        removeUsertype();
        commit(types.RESET_STATE);
        Vue.prototype.$loading.hide();
        resolve({ res, type });
      }).catch(err => {
        console.log('登出失败', err);
        Vue.prototype.$loading.hide();
        reject(err);
      });
    });
  },
  getUnreadNum: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.unreadNum).then(res => {
        // console.log('获取消息未读数成功', res);
        commit(types.SET_UNREAD_NUM, res.data);
        resolve(res);
      }).catch(err => {
        console.log('获取消息未读数失败', err);
        reject(err)
      });
    });
  },
  getMessages: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.getMessages(data.pageIndex, data.pageSize, data.type)).then(res => {
        console.log('获取系统消息成功', res);
        // commit(types.SET_MESSAGES, res.data);
        resolve(res);
      }).catch(err => {
        console.log('获取系统消息失败', err);
        reject(err)
      });
    });
  },
  readMessages: ({ commit, state }, msgId) => {
    return new Promise((resolve, reject) => {
      request.put(urls.readMessage(msgId)).then(res => {
        console.log('已读消息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('已读消息失败', err);
        reject(err)
      });
    });
  },
  adminLogout: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.post(urls.adminLogout).then(res => {
        console.log('登出成功', res);
        resetRouter();
        removeToken();
        removeUsertype();
        commit(types.RESET_STATE);
        resolve(res);
      }).catch(err => {
        console.log('登出失败', err);
        reject(err);
      });
    });
  },
  schoolEmailChange: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.schoolEmailChange, data).then(res => {
        console.log('发送验证码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('发送验证码失败', err);
        reject(err);
      });
    });
  },
  schoolEmailBind: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.schoolEmailBind, data).then(res => {
        console.log('修改邮箱成功', res);
        resolve(res);
      }).catch(err => {
        console.log('修改邮箱失败', err);
        reject(err);
      });
    });
  },
  studentEmailVerify: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.studentEmailVerify, data).then(res => {
        console.log('发送验证码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('发送验证码失败', err);
        reject(err);
      });
    });
  },
  adminEmailVerify: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.adminEmailVerify, data).then(res => {
        console.log('发送验证码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('发送验证码失败', err);
        reject(err);
      });
    });
  },
  studentRegister: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.studentRegister, data).then(res => {
        console.log('注册成功', res);
        setToken(res.data.token);
        setUsertype(res.data.userType);
        resolve(res);
      }).catch(err => {
        console.log('注册失败', err);
        reject(err);
      });
    });
  },
  adminRegister: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.adminRegister, data).then(res => {
        console.log('注册成功', res);
        setToken(res.data.token);
        setUsertype(res.data.userType);
        resolve(res);
      }).catch(err => {
        console.log('注册失败', err);
        reject(err);
      });
    });
  },
  resetToken: ({ commit }) => {
    return new Promise(resolve => {
      removeToken();
      removeUsertype();
      commit(types.RESET_STATE);
      resolve();
    });
  },
  forgetAndResetPassword: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(data.userType == 11 ? urls.adminForgetAndResetPassword : urls.forgetAndResetPassword, data).then(res => {
        console.log('重置密码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('重置密码失败', err);
        reject(err);
      });
    });
  },
  contactAdmin: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.contactAdmin, data, { "Content-Type": "multipart/form-data" }).then(res => {
        console.log('联系管理员成功', res);
        resolve(res);
      }).catch(err => {
        console.log('联系管理员失败', err);
        reject(err);
      });
    });
  },

  editAdminPersonalBase: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.editAdminPersonalBase, data).then(res => {
        console.log('修改管理员信息成功', res);
        commit(types.SET_USERINFO, res.data);
        resolve(res);
      }).catch(err => {
        console.log('修改管理员信息失败', err);
        reject(err);
      });
    });
  },
  resetStudentPassword: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.resetStudentPassword, data).then(res => {
        console.log('修改学生密码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('修改学生密码失败', err);
        reject(err);
      });
    });
  },
  resetAdminPassword: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.resetAdminPassword, data).then(res => {
        console.log('修改管理员密码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('修改管理员密码失败', err);
        reject(err);
      });
    });
  },
  resetSchoolPassword: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.resetSchoolPassword, data).then(res => {
        console.log('修改学校密码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('修改学校密码失败', err);
        reject(err);
      });
    });
  }
}