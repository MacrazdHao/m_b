import VueI18n from 'vue-i18n';
import Vue from 'vue';
import * as cookie from 'js-cookie';

Vue.use(VueI18n);

const files = require.context('.', true, /\.js$/);

const languages = [{ value: 'zh', cname: '中文' }, { value: 'en', cname: '英语' }]

const messages = (() => {
  let result = {};
  for (let i = 0; i < languages.length; i++) {
    result[languages[i].value] = {};
  }
  return result;
})()

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
  const key = 'myfellaslanguagekey';
  const result = cookie.get(key);
  return result || 'zh';
}

let i18n = new VueI18n({
  locale: getLocale(),
  messages
});

i18n.languages = languages;
i18n.getLocale = getLocale;

export default i18n;