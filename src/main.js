// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import i18n from './utils/language/index';
import ElementUI from 'element-ui';
import eleEn from 'element-ui/lib/locale/lang/en';
import eleZh from 'element-ui/lib/locale/lang/zh-CN';
// import "./assets/font.css";
import "./assets/animate.css";
import "./assets/transition.css";
import "./assets/font.css";
import 'element-ui/lib/theme-chalk/index.css';
import './utils/permission';
import _default from './utils/default.js';
import Dialog from './components/Dialog/dialog.js';
import LogoutDialog from './components/LogoutDialog/logoutDialog.js';
import Message from './components/Message/message.js';
import html2pdf from './utils/html2pdf';
// import VuePageStack from 'vue-page-stack';
// import '@/assets/icons' // icon

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   console.log(to, from)
// })

Vue.use(ElementUI, { locale: i18n.getLocale() == "zh" ? eleZh : eleEn })

Vue.use(LogoutDialog)
Vue.use(Dialog)
Vue.use(Message)
Vue.use(_default)
Vue.use(html2pdf)
// Vue.use(VuePageStack, { router }); 

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
