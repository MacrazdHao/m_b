import types from './types';
import urls from './urls';
import request from '../../utils/request';

export default {
  getMessages: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.messagesList(data.pageIndex, data.pageSize)).then(res => {
        console.log('获取知识中心消息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('获取知识中心消息失败', err);
        reject(err)
      });
    });
  },
  readMessages: ({ commit, state }, msgId) => {
    return new Promise((resolve, reject) => {
      request.put(urls.readMessage(msgId)).then(res => {
        console.log('已读消息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('已读消息失败', err);
        reject(err)
      });
    });
  },
}