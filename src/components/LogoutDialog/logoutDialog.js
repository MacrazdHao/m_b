import LogoutDialog from './logoutDialog.vue';

const _LogoutDialog = {};

_LogoutDialog.install = (Vue) => {

  let createLogoutDialog = () => {
    const vue = Vue;
    const LogoutDialogClass = vue.extend(LogoutDialog);
    const instance = new LogoutDialogClass();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    return instance;
  }

  const LogoutDialogMain = (confirm = () => { }, cancel = () => { }) => {
    let instance = createLogoutDialog();
    instance.confirm = confirm;
    instance.cancel = cancel;
    instance.visible = true;
  }
  Vue.prototype.$logoutDialog = LogoutDialogMain;
}

export default _LogoutDialog;