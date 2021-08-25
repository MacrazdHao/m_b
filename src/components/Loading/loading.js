import Loading from './loading.vue';

const _Loading = {};

const defaultOptions = {
  loadingTips: "",
  visible: false,
  callback: () => { },
}

_Loading.install = (Vue) => {

  let createLoading = () => {
    const vue = Vue;
    const LoadingClass = vue.extend(Loading);
    const instance = new LoadingClass();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    return instance;
  }
  let instance = createLoading();
  const LoadingMain = {
    toggle(options) {
      // 可以使用.then和.catch调用链，也可以使用回调函数（二者不兼容，两个方案取其一），不填写cancel函数则必须使用catch捕获事件
      let _options = { ...defaultOptions, ...options };
      return new Promise((resolve, reject) => {
        let goCatch = () => {
          reject("cancel");
        }
        instance.close = () => {
          (_options.close ? _options.close : _options.cancel ? _options.cancel : goCatch)();
          if (_options.close || _options.cancel) resolve();
        }
        instance.loadingTips = _options.loadingTips;
        instance.visible = _options.visible;
      });
    },
    show(options) {
      return new Promise((resolve, reject) => {
        this.toggle({ ...options, visible: true }).then(() => { resolve() }).catch(err => { reject(err) });
      });
    },
    hide(options) {
      return new Promise((resolve, reject) => {
        this.toggle({ ...options, visible: false }).then(() => { resolve() }).catch(err => { reject(err) });
      });
    }
  };
  Vue.prototype.$loading = LoadingMain;
}

export default _Loading;