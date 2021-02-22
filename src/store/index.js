import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    tasks: [],
    projects: [],
    projectsArray: [],
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
    setProjectsArray(state, data) {
      // プロジェクトを扱いやすいよう {id:value, title: value}の形にして配列に格納
      data = data.reduce((acc, el) => {
        let obj = {};
        let id = el.name.split("/");
        id = id[id.length - 1];

        obj.id = id;
        obj.title = el.fields.title.stringValue;
        acc.push(obj);
        return acc;
      }, []);
      state.projectsArray = data;
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
    setProjectsArray({ commit }, data) {
      commit("setProjectsArray", data);
    },
  },
  // modules: {},
});
