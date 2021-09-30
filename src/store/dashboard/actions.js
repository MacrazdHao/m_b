import types from './types';
import urls from './urls';
import request from '../../utils/request';

export default {
  getAdminDashboardData: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.adminDashboardData).then(res => {
        console.log('获取管理员控制台信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取管理员控制台信息失败', err);
        reject(err);
      });
    });
  },
}