import types from './types';
import urls from './urls';
import request from '../../utils/request';

export default {
  getProfileList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.profileList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取生涯档案列表成功', res);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getStudentInfo: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentInfo(userId)).then(res => {
        console.log('获取学生信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生信息失败', err);
        reject(err);
      });
    })
  },
}