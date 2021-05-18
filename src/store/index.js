import Vue from 'vue';
import Vuex from 'vuex';

import global from './global';
import user from './user';
import living from './living';
import module111 from './modules111';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    user,
    living,
    module111
  }
});