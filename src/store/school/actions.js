import types from './types';
import urls from './urls';
import request from '../../utils/request';
import Enum from '../../utils/enum';

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
  getSchoolInfo: ({ commit, state }, orgId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolInfo(orgId)).then(res => {
        console.log('获取学校信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学校信息失败', err);
        reject(err);
      });
    });
  },
  getStudentList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentList(data.schoolId, data.pageIndex, data.pageSize, Enum.getLocalNodeType(data.nodeType), data.keyword)).then(res => {
        console.log('获取学生列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生列表失败', err);
        reject(err);
      });
    });
  },
}