import urls from './urls';
import request from '../../utils/request';

export default {
  startLive: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.post(urls.startLive(data.liveId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
  stopLive: ({ commit, state }, liveId) => {
    return new Promise((resolve, reject) => {
      request.delete(urls.stopLive(liveId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
  stopRecord: ({ commit, state }, studentId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.stopRecord(studentId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
  startRecord: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      // request.post(urls.startRecord, {
      //   cname: data.liveId.toString(),
      //   studentId: parseInt(data.studentId),
      //   teacherId: parseInt(data.hostId)
      // }, {
      //   params: {
      //     cname: data.liveId.toString(),
      //     studentId: parseInt(data.studentId),
      //     teacherId: parseInt(data.hostId)
      //   }
      // }).then(res2 => {
      //   console.log('切换录制布局成功', res2);
      // }).catch(err2 => {
      //   console.log('切换录制布局失败', err2);
      // });
    })
  },
  getAgoraToken: ({ commit, state }, liveId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.getAgoraToken(liveId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getLiveInfo: ({ commit, state }, liveId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.getLiveInfo(liveId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
  changeMode: ({ commit, state }, liveId) => {
    return new Promise((resolve, reject) => {
      request.put(urls.changeMode(liveId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
  editUserSilence: ({ commit, state }, liveId) => {
    return new Promise((resolve, reject) => {
      request.put(urls.editUserSilence(liveId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
  editMySilence: ({ commit, state }, liveId) => {
    return new Promise((resolve, reject) => {
      request.put(urls.editMySilence(liveId)).then(res => {
        resolve(res.data);
      }).catch(err => {
        reject(err);
      });
    })
  },
}