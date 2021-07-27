import types from './types';
import urls from './urls';
import request from '../../utils/request';
import Enum from '@/utils/enum';

export default {
  getStateinfo: ({ commit, state }, data) => {
    return new Promise((resolve, reject) => {
      request.get(urls.stateInfo, data).then(res => {
        console.log('获取cecp状态信息成功', res);
        res.data.currentNodeDTO.nodeType = Enum.getLocalStage(res.data.currentNodeDTO.nodeType);
        commit(types.SET_STATEINFO, res.data.currentNodeDTO);
        resolve(res);
      }).catch(err => {
        console.log('获取cecp状态信息失败', err);
        reject(err);
      });
    });
  },
  submitBaseInfo: ({ commit, state }, data) => {
    data.nodeType = Enum.getServerStage(data.nodeType);
    return new Promise((resolve, reject) => {
      request.post(urls.baseInfo, data).then(res => {
        console.log('提交cecp基础信息成功', res);
        resolve(res);
      }).catch(err => {
        console.log('提交cecp基础信息失败', err);
        reject(err);
      });
    });
  },
  getConsultStatus: ({ commit, state }) => {
    return new Promise((resolve, reject) => {
      request.get(urls.consultStatus).then(res => {
        console.log('获取cecp咨询阶段状态成功', res);
        res.data.status = Enum.getLocalLiveStatus(res.data.status);
        resolve(res);
      }).catch(err => {
        console.log('获取cecp咨询阶段状态失败', err);
        reject(err);
      });
    });
  },
}