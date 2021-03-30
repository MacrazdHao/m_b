import getters from './getters';
import mutations from './mutations';
import actions from './actions';

const state = {
  userinfo: null,
  messages: []
}

export default {
  namespaced: true,
  state, getters, mutations, actions
}