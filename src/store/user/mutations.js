import types from './types';

const getDefaultState = () => {
  return {
    userinfo: null,
    unreadNum: 0
  }
}

export default {
  [types.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [types.SET_USERINFO](state, userinfo) {
    state.userinfo = userinfo;
  },
  [types.SET_UNREAD_NUM](state, unreadNum) {
    state.unreadNum = unreadNum;
  }
}