import Vue from "vue";
import Vuex from "vuex";

import { tag } from "@/config/API";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tags: []
  },
  mutations: {
    inputTags(state) {
      state.tags = tag();
    }
  },
  actions: {
    // async inputTags(context) {
    //   await tag().then(res => {
    //     context.commit("inputTags", res);
    //   });
    // }
  },
  modules: {}
});
