import Dialog from './dialog.vue';

const _Dialog = {};

const defaultOptions = {
  text: "",
  theme: "blue",
  confirm: false,
  cancel: false,
  confirmText: "",
  cancelText: "",
  close: false,
  showConfirm: true,
  showCancel: true,
  showClose: true
}

_Dialog.install = (Vue) => {

  let createDialog = () => {
    const vue = Vue;
    const DialogClass = vue.extend(Dialog);
    const instance = new DialogClass();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    return instance;
  }

  const DialogMain = {
    // showDialog(text, theme, confirm = false, cancel = false, confirmText = "", cancelText = "", close = false) {
    showDialog(options) {
      // 可以使用.then和.catch调用链，也可以使用回调函数（二者不兼容，两个方案取其一），不填写cancel函数则必须使用catch捕获事件
      let _options = { ...defaultOptions, ...options };
      return new Promise((resolve, reject) => {
        let goCatch = () => {
          reject("cancel");
        }
        let instance = createDialog();
        instance.text = (typeof _options.text) == 'string' ? [_options.text] : _options.text;
        instance.theme = _options.theme;
        instance.confirm = () => {
          (_options.confirm ? (() => { console.log(_options.confirm); _options.confirm(); resolve(); }) : resolve)();
        }
        instance.cancel = () => {
          (_options.cancel ? (() => { console.log(_options.cancel); _options.cancel(); resolve(); }) : goCatch)();
        }
        instance.close = () => {
          (_options.close ? _options.close : _options.cancel ? _options.cancel : goCatch)();
          if (_options.close || _options.cancel) resolve();
        }
        instance.confirmText = _options.confirmText;
        instance.cancelText = _options.cancelText;
        instance.showCancel = _options.showCancel;
        instance.showConfirm = _options.showConfirm;
        instance.showClose = _options.showClose;
        instance.visible = true;
      });
    },
    // message(text, confirm = false, cancel = false, confirmText = "", cancelText = "", close = false) {
    message(options) {
      return new Promise((resolve, reject) => {
        this.showDialog(options).then(() => { resolve() }).catch(err => { reject(err) });
      });
    },
    // warning(text, confirm = false, cancel = false, confirmText = "", cancelText = "", close = false) {
    warning(options) {
      return new Promise((resolve, reject) => {
        this.showDialog(options).then(() => { resolve() }).catch(err => { reject(err) });
      });
    }
  };
  Vue.prototype.$dialog = DialogMain;
}

export default _Dialog;