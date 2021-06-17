import urls from './urls';
import request from '../../utils/request_hr';

export default {
  startLive: ({ commit, state }, liveId) => {
    return new Promise((resolve, reject) => {
      request.post(urls.startLive(liveId)).then(res => {
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