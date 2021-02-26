const state = {
  projects: [],
  projectsArray: [],
};

const getters = {
  projects(state) {
    return state.projects;
  },
  projectsArray(state) {
    return state.projectsArray;
  },
};

const mutations = {
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
};

const actions = {
  setProjects({ commit }, data) {
    commit("setProjects", data);
  },
  setProjectsArray({ commit }, data) {
    commit("setProjectsArray", data);
  },
};

const projectsModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default projectsModule;
