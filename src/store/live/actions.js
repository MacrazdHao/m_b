import urls from './urls';
import request from '../../utils/request';
import Enum from '@/utils/enum';

export default {
  getLiveList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.liveList(data.pageIndex, data.pageSize, data.keyword, Enum.getServerLiveStatus(data.status))).then(res => {
        console.log('获取咨询师直播列表成功')
        for (let i = 0; i < res.data.length; i++) {
          res.data[i].status = Enum.getLocalLiveStatus(res.data[i].status);
        }
        resolve(res);
      }).catch(err => {
        reject(err);
      });
    })
  },
}