import Message from './message.vue';

const _Message = {};

const defaultOptions = {
  text: "",
  theme: "blue",
  duration: 2000,
  callback: () => { }
}

let messageNum = 0;

_Message.install = (Vue) => {
  let createMessage = () => {
    messageNum++;
    const vue = Vue;
    const MessageClass = vue.extend(Message);
    const instance = new MessageClass();
    instance.$mount(document.createElement('div'));
    document.body.appendChild(instance.$el);
    return instance;
  }

  const MessageMain = {
    // showMessage(text, theme, duration = 2000, callback = () => { }) {
    showMessage(options) {
      let _options = { ...defaultOptions, ...options };
      let instance = createMessage();
      instance.messageNum = messageNum;
      instance.callback = (num) => {
        _options.callback();
        console.log(num);
        if (num == messageNum) {
          messageNum = 0;
        }
        // messageNum--;
      }
      instance.text = _options.text;
      instance.theme = _options.theme;
      instance.visible = true;
      instance.duration = _options.duration;
    },
    // message(text) {
    message(options) {
      this.showMessage({ ...options, theme: 'blue' });
    },
    // warning(text) {
    warning(options) {
      this.showMessage({ ...options, theme: 'yellow' });
    },
    // error(text) {
    error(options) {
      this.showMessage({ ...options, theme: 'red' });
    }
  };
  Vue.prototype.$message = MessageMain;
}

export default _Message;