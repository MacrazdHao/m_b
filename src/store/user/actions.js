import types from './types';
import urls from './urls';
import request from '@/utils/request';
import { setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router/resetRouter';

export default {
  schoolLogin: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post("/user/login/account/school", data).then(res => {
        console.log('登陆成功', res);
        setToken(res.data.token);
        resolve(res);
      }).catch(err => {
        console.log('登录失败', err);
        reject(err);
      });
    });
  },
  studentLogin: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post("/user/login/email", data).then(res => {
        console.log('登陆成功', res);
        setToken(res.data.token);
        resolve(res);
      }).catch(err => {
        console.log('登录失败', err);
        reject(err);
      });
    });
  },
  adminLogin: ({ commit }) => {
    return new Promise((resolve, reject) => {
      request.post("/admin/login/account", data).then(res => {
        console.log('登陆成功', res);
        setToken(res.data.token);
        resolve(res);
      }).catch(err => {
        console.log('登录失败', err);
        reject(err);
      });
    });
  },
  getUserinfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get("/user/info", data).then(res => {
        console.log('获取用户信息成功', res);
        commit(types.SET_USERINFO, res.data);
        resolve(res);
      }).catch(err => {
        console.log('获取用户信息失败', err);
        reject(err);
      });
    });
  },
  getMessages: ({ commit, state }, data) => {
    return new Promise(resolve => {
      console.log('获取系统消息')
      commit(types.SET_MESSAGES, data);
      resolve();
    });
  },
  logout: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post("/user/logout", data).then(res => {
        console.log('登出成功', res);
        resetRouter();
        removeToken();
        commit(types.RESET_STATE);
        resolve(res);
      }).catch(err => {
        console.log('登出失败', err);
        reject(err);
      });
    });
  },
  adminLogout: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post("/admin/logout", data).then(res => {
        console.log('登出成功', res);
        resetRouter();
        removeToken();
        commit(types.RESET_STATE);
        resolve(res);
      }).catch(err => {
        console.log('登出失败', err);
        reject(err);
      });
    });
  },
  studentEmailVerify: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post("/user/register/email/code", data).then(res => {
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
      request.post("/admin/email/code", data).then(res => {
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
      request.post("/user/register/email", data).then(res => {
        console.log('注册成功', res);
        setToken(res.data.token);
        resolve(res);
      }).catch(err => {
        console.log('注册失败', err);
        reject(err);
      });
    });
  },
  adminRegister: ({ commit }, data) => {
    return new Promise((resolve, reject) => {
      request.post("/admin/register/email", data).then(res => {
        console.log('注册成功', res);
        setToken(res.data.token);
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
      commit(types.RESET_STATE);
      resolve();
    });
  }
}