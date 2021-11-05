import types from './types';
import urls from './urls';
import request from '../../utils/request';

export default {
  getAccountInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.accountInfo).then(res => {
        console.log('获取账号信息成功', res);
        commit(types.SET_ACCOUNTINFO, res.data);
        resolve(res);
      }).catch(err => {
        console.log('获取账号信息失败', err);
        reject(err);
      });
    });
  },
  getBaseInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.baseInfo).then(res => {
        console.log('获取基本信息成功', res);
        commit(types.SET_BASEINFO, res.data);
        resolve(res);
      }).catch(err => {
        console.log('获取基本信息失败', err);
        reject(err);
      });
    });
  },
  getSecurityInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.securityInfo).then(res => {
        console.log('获取安全信息成功', res);
        commit(types.SET_SECURITYINFO, res.data);
        resolve(res);
      }).catch(err => {
        console.log('获取安全信息失败', err);
        reject(err);
      });
    });
  },
  saveAccountInfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.accountInfo, data).then(res => {
        console.log('保存账号信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('保存账号信息失败', err);
        reject(err);
      });
    });
  },
  saveBaseInfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.baseInfo, data).then(res => {
        console.log('保存基本信息成功', res);
        commit(types.SET_BASEINFO, data);
        resolve(res);
      }).catch(err => {
        console.log('保存基本信息失败', err);
        reject(err);
      });
    });
  },
  saveSecurityInfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.securityInfo, data).then(res => {
        console.log('保存安全信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('保存安全信息失败', err);
        reject(err);
      });
    });
  },

  getSchoolBaseInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolBaseInfo).then(res => {
        console.log('获取学校基本信息成功', res);
        commit(types.SET_BASEINFO, res.data);
        resolve(res);
      }).catch(err => {
        console.log('获取基本信息失败', err);
        reject(err);
      });
    });
  },
  getSchoolSecurityInfo: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolSecurityInfo).then(res => {
        console.log('获取学校安全信息成功', res);
        commit(types.SET_SECURITYINFO, res.data);
        resolve(res);
      }).catch(err => {
        console.log('获取安全信息失败', err);
        reject(err);
      });
    });
  },
  saveSchoolBaseInfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.schoolBaseInfo, data).then(res => {
        console.log('保存学校基本信息成功', res);
        commit(types.SET_BASEINFO, data);
        resolve(res);
      }).catch(err => {
        console.log('保存基本信息失败', err);
        reject(err);
      });
    });
  },
  saveSchoolSecurityInfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.schoolSecurityInfo, data).then(res => {
        console.log('保存学校安全信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('保存安全信息失败', err);
        reject(err);
      });
    });
  },

}