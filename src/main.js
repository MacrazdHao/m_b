// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import i18n from './utils/language/index';
import store from './store/index';
import ElementUI from 'element-ui';
// import "./assets/font.css";
import "./assets/animate.css";
import "./assets/transition.css";
import 'element-ui/lib/theme-chalk/index.css'
import './utils/permission'
import Dialog from './components/Dialog/dialog.js';
// import '@/assets/icons' // icon

Vue.config.productionTip = false

// router.beforeEach((to, from, next) => {
//   console.log(to, from)
// })

Vue.use(ElementUI)

Vue.use(Dialog)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  i18n,
  store,
  components: { App },
  template: '<App/>'
})
