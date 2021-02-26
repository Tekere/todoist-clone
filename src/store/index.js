import Vue from "vue";
import Vuex from "vuex";
import tasksModule from "./tasks";
import projectsModule from "./projects";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    tasksModule,
    projectsModule,
  },
});
