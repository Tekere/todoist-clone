const state = {
  tasks: [],
};

const getters = {
  tasks(state) {
    return state.tasks;
  },
};

const mutations = {
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
};

const actions = {
  setTasks({ commit }, data) {
    commit("setTasks", data);
  },
  doneTask({ commit }, id) {
    commit("doneTask", id);
  },
};

const tasksModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};

export default tasksModule;
