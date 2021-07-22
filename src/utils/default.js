import config from './config';

const _default = {};

_default.install = (Vue) => {
  Vue.prototype.$_default = {
    avatar: require("@/assets/index/anna.jpg"),
    ossUrl: config.ossURL
  };
}

export default _default;