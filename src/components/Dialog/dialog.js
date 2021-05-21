import Dialog from './dialog.vue';

const _Dialog = {};

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
    showDialog(text, theme, confirm = false, cancel = false, confirmText = "", cancelText = "", close = false) {
      // 可以使用.then和.catch调用链，也可以使用回调函数（二者不兼容，两个方案取其一）
      return new Promise((resolve, reject) => {
        let goCatch = () => {
          throw "cancel";
        }
        let instance = createDialog();
        instance.text = (typeof text) == 'string' ? [text] : text;
        instance.theme = theme;
        // instance.confirm = () => { confirm(resolve); resolve(); };
        // instance.cancel = () => { cancel(resolve); resolve(); };
        // instance.close = () => { (close ? close : cancel)(); resolve(); };
        instance.confirm = () => {
          (confirm ? (() => { console.log(confirm); confirm(); resolve(); }) : resolve)();
        }
        instance.cancel = () => {
          (cancel ? (() => { console.log(cancel); cancel(); resolve(); }) : goCatch)();
        }
        instance.close = () => {
          // console.log('close', close, 'cancel', cancel, 'or', close ? close : cancel ? cancel : goCatch);
          (close ? close : cancel ? cancel : goCatch)();
          if (close || cancel) resolve();
        }

        instance.confirmText = confirmText;
        instance.cancelText = cancelText;
        instance.visible = true;
      });
    },
    message(text, confirm = false, cancel = false, confirmText = "", cancelText = "", close = false) {
      return this.showDialog(text, 'blue', confirm, cancel, confirmText, cancelText, close);
    },
    warning(text, confirm = false, cancel = false, confirmText = "", cancelText = "", close = false) {
      return this.showDialog(text, 'red', confirm, cancel, confirmText, cancelText, close);
    }
  };
  Vue.prototype.$dialog = DialogMain;
}

export default _Dialog;