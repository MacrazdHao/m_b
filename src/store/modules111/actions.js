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
  getUserinfo: ({ commit, state }, data) => {
    commit(types.SET_USERINFO, data);
  }
}