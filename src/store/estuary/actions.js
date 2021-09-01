import types from './types';
import urls from './urls';
import request from '../../utils/request';

export default {
  getStudentList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取学生列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生列表失败', err);
        reject(err);
      });
    })
  },
  getStudentConsultInfo: ({ commit, state }, recordId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentConsultInfo(recordId)).then(res => {
        console.log('获取学生咨询信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生咨询信息失败', err);
        reject(err);
      });
    })
  },
  setConsultant: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.setConsultant, data, { "Content-Type": "multipart/form-data" }).then(res => {
        console.log('设置学生咨询师成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生咨询师失败', err);
        reject(err);
      });
    })
  },
  setConsultTimes: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.setConsultTimes, data, { "Content-Type": "multipart/form-data" }).then(res => {
        console.log('设置学生咨询次数成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生咨询次数失败', err);
        reject(err);
      });
    })
  },
  setConsultInfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.setConsultInfo, data).then(res => {
        console.log('设置学生咨询信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生咨询信息失败', err);
        reject(err);
      });
    })
  },
  getPlaybackList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.playbackList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取回看列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取回看列表失败', err);
        reject(err);
      });
    })
  },
  getStudentPlayback: ({ commit, state }, recordId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentPlayback(recordId)).then(res => {
        console.log('获取学生回看列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生回看列表失败', err);
        reject(err);
      });
    })
  },
  getStudentLiveList: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentLiveList).then(res => {
        console.log('获取学生直播列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取学生直播列表失败', err);
        reject(err);
      });
    })
  },
  getConsultantLiveList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.consultantLiveList(data.pageIndex, data.pageSize, data.status, data.keyword)).then(res => {
        console.log('获取咨询师直播列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取咨询师直播列表失败', err);
        reject(err);
      });
    })
  },
  getConsultantList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.consultantList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取咨询师列表成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取咨询师列表失败', err);
        reject(err);
      });
    })
  },
}