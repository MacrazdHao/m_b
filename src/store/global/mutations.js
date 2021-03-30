import types from './types';

const getDefaultState = () => {
  return {
    userinfo: null
  }
}

export default {
  [types.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [types.SET_MENU](state, menu) {
    state.menu = menu;
  }
}