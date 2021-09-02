const baseOssURL = "https://oss.veminar.net";
const baseURL = 'https://cecp.myfellas.net/api';
const mockURL = 'http://192.168.0.104:3001/mock/11';
const testURL = 'http://192.168.0.104:9080';
const testURL2 = 'http://192.168.0.104:8003';
const luohuanURL = 'http://192.168.1.117:9080';
const luohuanURL2 = 'http://192.168.1.87:9081';
const doudouURL = 'http://test.myfellas.net';
const wenjieURL = 'http://192.168.1.17:9080';
const haoranURL = 'http://192.168.1.45:9081';
const ossURL = "http://192.168.0.104:32747";

let _URL = process.env.NODE_ENV == "development" ? localStorage.getItem("myfellas_requestURL") || luohuanURL2 : baseURL;
let _ossURL = process.env.NODE_ENV == "development" ? localStorage.getItem("myfellas_ossURL") || ossURL : baseOssURL;

export default {
  URL: _URL,
  ossURL: _ossURL,
  getEnv: () => {
    return process.env.NODE_ENV;
  },
  setURL: (url) => {
    localStorage.setItem("myfellas_requestURL", url);
    window.location.reload();
  },
  setOSSURL: (url) => {
    localStorage.setItem("myfellas_ossURL", url);
    window.location.reload();
  },
  urls: {
    baseURL,
    mockURL,
    testURL,
    testURL2,
    luohuanURL,
    luohuanURL2,
    doudouURL,
    wenjieURL,
    haoranURL,
    ossURL,
  }
};