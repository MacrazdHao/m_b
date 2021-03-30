import types from './types';

const getDefaultState = () => {
  return {
    userinfo: null,
    messages: []
  }
}

export default {
  [types.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = userinfo;
  },
  [types.SET_MESSAGES](state, messages) {
    state.messages = messages;
  }
}