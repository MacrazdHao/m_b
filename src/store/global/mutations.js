import types from './types';
import i18n from '@/utils/language';

const getDefaultState = () => {
  return {
    language: i18n.locale,
    menu: null,
    phoneVCodeSeconds: 0,
    emailVCodeSeconds: 0,
  }
}

export default {
  [types.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [types.SET_MENU](state, menu) {
    state.menu = menu;
  },
  [types.SET_PHONE_VCODE_SECONDS](state, seconds) {
    state.phoneVCodeSeconds = seconds;
  },
  [types.SET_EMAIL_VCODE_SECONDS](state, seconds) {
    state.emailVCodeSeconds = seconds;
  },
  [types.RESET_MENU](state) {
    state.menu = null;
  }
}