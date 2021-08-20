import urls from './urls';
import request from '../../utils/request';
import Enum from '../../utils/enum';

export default {
  getCounselingList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.counselingList(data.pageIndex, data.pageSize, data.keyword, Enum.getServerNodeStage(data.nodeType))).then(res => {
        console.log('获取咨询师直播列表成功', res)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].nodeType = Enum.getLocalNodeType(res.data[i].nodeType);
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getStudentDetail: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentDetail(userId)).then(res => {
        console.log('获取学生详情成功', res)
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getStudentSchedule: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentSchedule(userId)).then(res => {
        console.log('获取学生直播时间成功', res)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].status = Enum.getLocalLiveStatus(res.data[i].status);
          res.data[i].nodeType = Enum.getLocalNodeType(res.data[i].nodeType);
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  saveStudentSchedule: ({ commit, state }, data) => {
    for (let i = 0; i < data.times.length; i++) {
      data.times[i].nodeType = Enum.getServerNodeType(data.times[i].nodeType);
    }
    return new Promise((resolve, reject) => {
      request.post(urls.saveStudentSchedule(data.studentId), data.times).then(res => {
        console.log('保存学生直播时间成功', res)
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getStudentProfile: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentProfile(data)).then(res => {
        console.log('获取学生档案成功', res);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getStudentProfileList: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentProfileList(userId)).then(res => {
        console.log('获取学生档案列表成功', res);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  saveStudentProfile: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.saveStudentProfile(data.userId), data).then(res => {
        console.log('保存学生档案成功', res);
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  endLiveNode: ({ commit, state }, studentId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.endLiveNode(studentId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getStudentCurrentLiveInfo: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentCurrentLiveInfo(userId)).then(res => {
        console.log('获取学生当前直播信息成功', res)
        for (let i = 0; i < res.data.length; i++) {
          res.data.status = Enum.getLocalLiveStatus(res.data[i].status);
          // res.data.nodeType = Enum.getLocalNodeType(res.data[i].nodeType);
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getStudentHistoryLiveList: ({ commit, state }, userId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.studentHistoryLiveList(userId)).then(res => {
        console.log('获取学生直播时间成功', res)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].status = Enum.getLocalLiveStatus(res.data[i].status);
          res.data[i].nodeType = Enum.getLocalNodeType(res.data[i].nodeType);
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
}