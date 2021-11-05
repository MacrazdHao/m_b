import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  accountInfo: null,
  baseInfo: null,
  securityInfo: null,
}

export default {
  namespaced: true,
  state, getters, mutations, actions
}