const permissionMode = 'PerMode';
const testMode = 'TestMode';

let routerMode = process.env.NODE_ENV == "development" ? localStorage.getItem("myfellas_routerMode") || testMode : permissionMode;

export default {
  routerSetting: {
    routerModes: { permissionMode, testMode },
    getRouterMode: () => {
      return routerMode;
    },
    setRouterMode: (_mode) => {
      localStorage.setItem("myfellas_routerMode", _mode);
      window.location.reload();
    }
  }
}