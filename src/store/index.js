import Vue from "vue";
import Vuex from "vuex";
import tasksModule from "./tasks";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tasksModule,
  },
});
