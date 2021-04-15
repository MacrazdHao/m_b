import types from './types';
import i18n from '@/utils/language';

const getDefaultState = () => {
  return {
    language: i18n.locale,
    menu: null
  }
}

export default {
  [types.RESET_STATE](state) {
    Object.assign(state, getDefaultState());
  },
  [types.SET_MENU](state, menu) {
    state.menu = menu;
  },
  [types.RESET_MENU](state) {
    state.menu = null;
  }
}