import types from './types';

const getDefaultState = () => {
  return {
    accountInfo: null,
    baseInfo: null,
    securityInfo: null,
  }
}

export default {
  [types.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [types.SET_BASEINFO](state, baseInfo) {
    state.baseInfo = baseInfo;
  },
  [types.SET_ACCOUNTINFO](state, accountInfo) {
    state.accountInfo = accountInfo;
  },
  [types.SET_SECURITYINFO](state, securityInfo) {
    state.securityInfo = securityInfo;
  },
}