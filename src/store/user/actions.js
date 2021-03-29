import types from './types';
import urls from './urls';
import request from '../../utils/request';
import { setToken } from '../../utils/auth';

export default {
  test: ({ commit, state }, data) => {
    request.get(urls.test).then(res => {
      console.log('测试请求成功:', res);
    }).catch(err => {
      console.log('测试请求出错:', err);
    })
  },
  login: ({ commit, state }, data) => {
    commit(types.SET_USERINFO, { avatar: '', username: '豆豆' });
    setToken('thisisatoken');
  },
  getUserinfo: ({ commit, state }, data) => {
    commit(types.SET_USERINFO, data);
  }
}