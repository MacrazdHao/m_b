import urls from './urls';
import request from '../../utils/request';

export default {
  getLiveList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.liveList(data.pageIndex, data.pageSize, data.keyword, data.status)).then(res => {
        console.log('获取咨询师直播列表成功')
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
}