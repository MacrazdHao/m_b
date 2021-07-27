import getters from './getters';
import mutations from './mutations';
import actions from './actions';
import i18n from '@/utils/language';

const state = {
  menu: null,
  language: i18n.locale,
  phoneVCodeSeconds: 0,
  emailVCodeSeconds: 0,
}

export default {
  namespaced: true,
  state, getters, mutations, actions
}