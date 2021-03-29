import axios from 'axios'
import { MessageBox, Message, Loading } from 'element-ui'
import store from '@/store'
import { getToken, removeToken } from '@/utils/auth'
import { baseURL } from './config';
import i18n from './language';

const service = axios.create({
  baseURL, // url = base url + request url
  timeout: 5000 // request timeout
})

service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
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
    if (window.loading) { window.loading.close(); window.loading = null; }

    if (res.code == 422) {
      Message({
        message: i18n.t('tips.loginExpire'),
        type: 'error',
        duration: 5 * 1000
      });
      removeToken();
    }

    if (!res.success) {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (window.loading) { window.loading.close(); window.loading = null; }
    Message({
      message: error.msg || i18n.t('tips.requestTimeout'),
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
