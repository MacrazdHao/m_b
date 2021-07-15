import types from './types';
import urls from './urls';
import request from '../../utils/request_online';

export default {
  getSchoolList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取学校列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学校列表失败', err);
        reject(err);
      });
    });
  },
}