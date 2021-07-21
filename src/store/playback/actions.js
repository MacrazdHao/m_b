import urls from './urls';
import request from '../../utils/request_lh';

export default {
  getLiveList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.liveList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取回看列表成功', res)
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
  getRecordList: ({ commit, state }, studentId) => {
    return new Promise((resolve, reject) => {
      request.get(urls.recordList(studentId)).then(res => {
        console.log('获取回看列表成功', res)
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
}