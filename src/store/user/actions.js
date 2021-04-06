import types from './types';
import urls from './urls';
import request from '@/utils/request';
import { setToken, removeToken } from '@/utils/auth';
import { resetRouter } from '@/router/resetRouter';

export default {
  test: ({ commit, state }, data) => {
    request.get(urls.test).then(res => {
      console.log('测试请求成功:', res);
    }).catch(err => {
      console.log('测试请求出错:', err);
    })
  },
  schoolLogin: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post("/user/login/account/school", data).then(res => {
        resolve(res);
        console.log('登陆成功', res);
        setToken(res.token);
      }).catch(err => {
        console.log('登录失败', err);
        reject(err);
      });
    });
  },
  studentLogin: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post("/user/login/email", data).then(res => {
        resolve(res);
        console.log('登陆成功', res);
        setToken(res.token);
      }).catch(err => {
        console.log('登录失败', err);
        reject(err);
      });
    });
  },
  getUserinfo: ({ commit, state }, data) => {
    return new Promise(resolve => {
      console.log('获取用户信息')
      commit(types.SET_USERINFO, data);
      resolve();
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
    return new Promise(resolve => {
      console.log('退出登录')
      resetRouter();
      removeToken();
      commit(types.RESET_STATE);
      resolve();
    });
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken();
      commit(types.RESET_STATE);
      resolve();
    });
  }
}