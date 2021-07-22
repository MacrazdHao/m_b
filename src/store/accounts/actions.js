import types from './types';
import urls from './urls';
import request from '../../utils/request';

export default {
  getAdminList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.adminList(data.pageIndex, data.pageSize)).then(res => {
        console.log('获取管理员列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取管理员列表失败', err);
        reject(err);
      });
    });
  },
  editAdminPassword: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.editAdminPassword(data.userId), data).then(res => {
        console.log('修改管理员密码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('修改管理员密码失败', err);
        reject(err);
      });
    });
  },
  deleteAdminAccount: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.delete(urls.deleteAdminAccount(userId)).then(res => {
        console.log('删除管理员成功', res);
        resolve(res);
      }).catch(err => {
        console.log('删除管理员失败', err);
        reject(err);
      });
    });
  },
  deleteAdminAccounts: ({ commit, state }, userIdArr) => {
    console.log(userIdArr);
    // userIdArr为数组
    return new Promise((resolve, reject) => {
      request.delete(urls.deleteAdminAccounts, { data: userIdArr }).then(res => {
        console.log('删除管理员成功', res);
        resolve(res);
      }).catch(err => {
        console.log('删除管理员失败', err);
        reject(err);
      });
    });
  },
  createAdminAccount: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.createAdminAccount, data).then(res => {
        console.log('创建管理员账号成功', res);
        resolve(res);
      }).catch(err => {
        console.log('创建管理员账号失败', err);
        reject(err);
      });
    });
  },

  getSchoolList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.schoolList(data.pageIndex, data.pageSize)).then(res => {
        console.log('获取学校列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学校列表失败', err);
        reject(err);
      });
    });
  },
  editSchoolPassword: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.put(urls.editSchoolPassword(data.userId), data).then(res => {
        console.log('修改学校密码成功', res);
        resolve(res);
      }).catch(err => {
        console.log('修改学校密码失败', err);
        reject(err);
      });
    });
  },
  deleteSchoolAccount: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.delete(urls.deleteSchoolAccount(userId)).then(res => {
        console.log('删除学校成功', res);
        resolve(res);
      }).catch(err => {
        console.log('删除学校失败', err);
        reject(err);
      });
    });
  },
  deleteSchoolAccounts: ({ commit, state }, userIdArr) => {
    console.log(userIdArr);
    // userIdArr为数组
    return new Promise((resolve, reject) => {
      request.delete(urls.deleteSchoolAccounts, { data: userIdArr }).then(res => {
        console.log('删除学校成功', res);
        resolve(res);
      }).catch(err => {
        console.log('删除学校失败', err);
        reject(err);
      });
    });
  },
  createSchoolAccount: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.createSchoolAccount, data).then(res => {
        console.log('创建学校账号成功', res);
        resolve(res);
      }).catch(err => {
        console.log('创建学校账号失败', err);
        reject(err);
      });
    });
  },
}