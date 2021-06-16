import Message from './message.vue';

const _Message = {};
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
    showMessage(text, theme, duration = 2000, callback = () => { }) {
      let instance = createMessage();
      instance.messageNum = messageNum;
      instance.callback = (num) => {
        callback();
        console.log(num);
        if (num == messageNum) {
          messageNum = 0;
        }
        // messageNum--;
      }
      instance.text = text;
      instance.theme = theme;
      instance.visible = true;
      instance.duration = duration;
    },
    message(text) {
      this.showMessage(text, 'blue');
    },
    warning(text) {
      this.showMessage(text, 'yellow');
    },
    error(text) {
      this.showMessage(text, 'red');
    }
  };
  Vue.prototype.$message = MessageMain;
}

export default _Message;