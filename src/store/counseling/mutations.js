import types from './types';

const getDefaultState = () => {
  return {
    stateInfo: null
  }
}

export default {
  [types.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [types.SET_STATEINFO](state, stateInfo) {
    state.stateInfo = stateInfo;
  }
}