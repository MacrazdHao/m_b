import Dialog from './dialog.vue';

const _Dialog = {};

_Dialog.install = (Vue) => {
  const vue = Vue;
  const DialogClass = vue.extend(Dialog);
  const instance = new DialogClass();
  instance.$mount(document.createElement('div'));
  document.body.appendChild(instance.$el);

  const DialogMain = {
    showDialog(text, theme, confirm, cancel) {
      instance.text = text;
      instance.theme = theme;
      instance.confirm = confirm;
      instance.cancel = cancel;
      instance.visible = true;
    },
    message(text, confirm, cancel) {
      this.showDialog(text, 'blue', confirm, cancel);
    },
    warning(text, confirm, cancel) {
      this.showDialog(text, 'red', confirm, cancel);
    }
  };
  Vue.prototype.$dialog = DialogMain;
}

export default _Dialog;