import urls from './urls';
import request from '../../utils/request_lh';

export default {
  getCounselingList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.counselingList(data.pageIndex, data.pageSize, data.keyword, data.nodeType)).then(res => {
        console.log('获取咨询师直播列表成功')
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
}