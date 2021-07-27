import urls from './urls';
import request from '../../utils/request';
import Enum from '../../utils/enum';

export default {
  getLiveList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.liveList(data.pageIndex, data.pageSize, data.keyword)).then(res => {
        console.log('获取回看列表成功', res)
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].nodeType = Enum.getLocalNodeType(res.data[i].nodeType);
        }
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