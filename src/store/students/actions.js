import types from './types';
import urls from './urls';
import request from '../../utils/request';
import Enum from '../../utils/enum';

export default {
  getStudentList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentList(data.pageIndex, data.pageSize, data.keyword, Enum.getServerNodeStage(data.nodeType))).then(res => {
        console.log('获取学生列表成功', res)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].nodeType = Enum.getLocalNodeType(res.data[i].nodeType);
        }
        resolve(res);
      }).catch(err => {
        console.log('获取学生列表失败', err);
        reject(err);
      });
    })
  },
  getTemplateList: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.templateList).then(res => {
        console.log('获取模板列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取模板列表失败', err);
        reject(err);
      });
    })
  },
  setStudentTemplate: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.setStudentTemplate, data).then(res => {
        console.log('设置模板成功', data.studentId, res);
        resolve(res);
      }).catch(err => {
        console.log('设置模板失败', data.studentId, err);
        reject(err);
      });
    })
  },
}