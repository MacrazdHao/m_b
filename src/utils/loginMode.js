const hasLoginMode = 'HasLoginMode';
const noLoginMode = 'NoLoginMode';

let loginMode = process.env.NODE_ENV == "development" ? localStorage.getItem("myfellas_loginMode") || hasLoginMode : hasLoginMode;

export default {
  loginModeSetting: {
    loginModes: { hasLoginMode, noLoginMode },
    getLoginMode: () => {
      return loginMode;
    },
    setLoginMode: (_mode) => {
      localStorage.setItem("myfellas_loginMode", _mode);
      window.location.reload();
    }
  }
}