import urls from './urls';
import request from '../../utils/request';
import Enum from '../../utils/enum';

export default {
  getCounselingList: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.counselingList(data.pageIndex, data.pageSize, data.keyword, Enum.getServerNodeType(data.nodeType))).then(res => {
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
}