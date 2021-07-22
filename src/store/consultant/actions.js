import types from './types';
import urls from './urls';
import request from '../../utils/request';

export default {
  getConsultantList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.consultantList(data.pageIndex, data.pageSize, data.keyword), data).then(res => {
        console.log('获取咨询师列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取咨询师列表失败', err);
        reject(err);
      });
    });
  },
  deleteConsultant: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.deleteConsultant(userId)).then(res => {
        console.log('删除咨询师成功', res);
        resolve(res);
      }).catch(err => {
        console.log('删除咨询师失败', err);
        reject(err);
      });
    });
  },
}