import VueI18n from 'vue-i18n';
import Vue from 'vue';
import * as cookie from 'js-cookie';

Vue.use(VueI18n);

const files = require.context('.', true, /\.js$/);

const messages = {
  zh: {},
  en: {}
}

// 遍历引入本文件夹内的所有js文件数据
files.keys().forEach(key => {
  // 过滤本身
  if (key == './index.js') return;
  // 提取文件名作为key
  const temp = key.replace('./', '').replace('.js', '').split('/');
  const count = temp.length;
  // 如果有子文件夹，导入文件夹及index.js内的内容
  if (count > 1 && temp[count - 1] != 'index') return;
  // 读取js文件内的数据
  const config = files(key).default;
  messages.zh[temp] = config.zh;
  messages.en[temp] = config.en;
});

const getLocale = () => {
  const key = 'langualekey';
  const result = cookie.get(key);
  return result || 'zh';
}

const i18n = new VueI18n({
  locale: getLocale(),
  messages
});

export default i18n;