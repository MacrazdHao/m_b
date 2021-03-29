import types from './types';

export default {
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = userinfo;
  }
}