import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { baseURL, mockURL, testURL, wenjieURL, haoranURL } from './config';
import i18n from './language';
import Vue from 'vue';

const service = axios.create({
  // baseURL: mockURL, // url = base url + request url
  baseURL: haoranURL,
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = token;
    }
    return config
  },
  error => {
    if (window.loading) { window.loading.close(); window.loading = null; }
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    const res = response.data
    console.log(response)
    if (window.loading) { window.loading.close(); window.loading = null; }

    if (res.code == 422) {
      // Message({
      //   message: i18n.t('tips.loginExpire'),
      //   type: 'error',
      //   duration: 5 * 1000
      // });
      Vue.prototype.$message.error(i18n.t('tips.loginExpire'))
      removeToken();
    }

    if (!res.success) {
      // Message({
      //   message: res[i18n.t('tips.msgKey')] || 'Error',
      //   type: 'error',
      //   duration: 5 * 1000
      // })
      Vue.prototype.$message.error(res[i18n.t('tips.msgKey')] || 'Error')
      return Promise.reject(new Error(res[i18n.t('tips.msgKey')] || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (window.loading) { window.loading.close(); window.loading = null; }
    // Message({
    //   message: error.msg || i18n.t('tips.requestTimeout'),
    //   type: 'error',
    //   duration: 5 * 1000
    // })
    Vue.prototype.$message.error(error.msg || i18n.t('tips.requestTimeout'));
    return Promise.reject(error)
  }
)

export default service