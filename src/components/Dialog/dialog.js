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
    showDialog(text, theme, confirm = () => { }, cancel = () => { }, confirmText = "", cancelText = "") {
      // 可以使用.then和.catch调用链，也可以使用回调函数
      return new Promise((resolve, reject) => {
        let instance = createDialog();
        instance.text = (typeof text) == 'string' ? [text] : text;
        instance.theme = theme;
        instance.confirm = () => { confirm(); resolve(); };
        instance.cancel = () => { cancel(); resolve(); };
        instance.confirmText = confirmText;
        instance.cancelText = cancelText;
        instance.visible = true;
      });
    },
    message(text, confirm = () => { }, cancel = () => { }, confirmText = "", cancelText = "") {
      return this.showDialog(text, 'blue', confirm, cancel, confirmText, cancelText);
    },
    warning(text, confirm = () => { }, cancel = () => { }, confirmText = "", cancelText = "") {
      return this.showDialog(text, 'red', confirm, cancel, confirmText, cancelText);
    }
  };
  Vue.prototype.$dialog = DialogMain;
}

export default _Dialog;