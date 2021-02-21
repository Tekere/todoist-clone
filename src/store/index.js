import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    projects: [],
    projectNames: [],
  },
  mutations: {
    setTasks(state, data) {
      state.tasks = data;
    },
    doneTask(state, id) {
      let target = state.tasks.find((el) => {
        return el.name == id;
      });

      switch (target.fields.status.integerValue) {
        case "0":
          target.fields.status.integerValue = "1";
          break;
        case "1":
          target.fields.status.integerValue = "0";
          break;
      }
    },
    setProjects(state, data) {
      state.projects = data.slice();
    },
    setProjectNames(state, data) {
      // data = data.map((el) => {
      //   return el.title;
      // });
      // state.projectNames = data;
    },
  },
  actions: {
    setTasks({ commit }, data) {
      commit("setTasks", data);
    },
    doneTask({ commit }, id) {
      commit("doneTask", id);
    },
    setProjects({ commit }, data) {
      commit("setProjects", data);
    },
    // setProjectNames({ commit }, data) {
    //   commit("setProjectNames", data);
    // },
  },
  // modules: {},
});