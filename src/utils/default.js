import { baseURL, mockURL, testURL, wenjieURL, haoranURL, luohuanURL, luohuanURL2, imgURL } from './config';

const _default = {};

_default.install = (Vue) => {
  Vue.prototype.$_default = {
    avatar: require("@/assets/index/anna.jpg"),
    ossUrl: imgURL
  };
}

export default _default;