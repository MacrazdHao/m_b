import Vue from 'vue';
import Vuex from 'vuex';

import global from './global';
import user from './user';
import living from './living';
import counseling from './counseling';
import accounts from './accounts';
import school from './school';
import consultant from './consultant';
import live from './live';
import management from './management';
import playback from './playback';
import modules from './modules';
import students from './students';
import archives from './archives';
import files from './files';
import module111 from './modules111';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    global,
    user,
    living,
    counseling,
    accounts,
    school,
    consultant,
    live,
    management,
    playback,
    modules,
    students,
    archives,
    files,
    module111
  }
});