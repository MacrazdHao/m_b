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
  login: ({ commit, state }, data) => {
    return new Promise(resolve => {
      console.log('登陆成功')
      // 这里需要组装router
      commit(types.SET_USERINFO, { avatar: '', username: '豆豆' });
      setToken('thisisatoken');
      resolve();
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