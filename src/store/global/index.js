import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import i18n from '@/utils/language';

const state = {
  menu: [],
  language: i18n.locale
}

export default {
  namespaced: true,
  state, getters, mutations, actions
}