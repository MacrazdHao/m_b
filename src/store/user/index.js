import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  userinfo: null,
  unreadNum: 0
}

export default {
  namespaced: true,
  state, getters, mutations, actions
}