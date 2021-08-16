import types from './types';
import urls from './urls';
import request from '../../utils/request';

export default {
  getModuleList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.moduleList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取模板列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取模板列表失败', err);
        reject(err);
      });
    });
  },
  deleteModule: ({ commit, state }, templateId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.deleteModule(templateId)).then(res => {
        console.log('删除模板成功', res);
        resolve(res);
      }).catch(err => {
        console.log('删除模板失败', err);
        reject(err);
      });
    });
  },
  getModuleInfo: ({ commit, state }, templateId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.moduleInfo(templateId)).then(res => {
        console.log('获取模板信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取模板信息失败', err);
        reject(err);
      });
    });
  },
  editTemplateInfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.editModuleInfo, data).then(res => {
        console.log('保存模板成功', res);
        resolve(res);
      }).catch(err => {
        console.log('保存模板失败', err);
        reject(err);
      });
    });
  },
  createTemplate: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.createTemplate, data).then(res => {
        console.log('新建模板成功', res);
        resolve(res);
      }).catch(err => {
        console.log('新建模板失败', err);
        reject(err);
      });
    });
  },
}