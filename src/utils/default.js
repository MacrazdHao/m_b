const _default = {};

_default.install = (Vue) => {
  Vue.prototype.$_default = {
    avatar: require("@/assets/index/anna.jpg")
  };
}

export default _default;