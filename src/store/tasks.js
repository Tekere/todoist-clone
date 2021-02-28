import firebase from "firebase";

const state = {
  tasks: [],
};

const getters = {
  tasks(state) {
    // ここでmutationするのはよくない？
    let tasks = state.tasks;
    tasks.sort((a, b) => {
      if (a.dueDate < b.dueDate) return -1;
      if (a.dueDate > b.dueDate) return 1;
    });
    return tasks;
  },
};

const mutations = {
  setTasks(state, data) {
    state.tasks.push(data);
  },
  doneTask(state, data) {
    //
  },
  addTask(state, newTask) {
    state.tasks.push(newTask);
  },
};

const actions = {
  doneTask({ commit }, task) {
    commit("doneTask", task);
  },
  addTask({ commit }, newTask) {
    firebase
      .firestore()
      .collection("tasks")
      .add(newTask);
    commit("addTask", newTask);
  },
  fetchTasks({ commit }) {
    firebase
      .firestore()
      .collection("tasks")
      .get()
      .then((response) => {
        response.forEach((doc) => commit("setTasks", doc.data()));
      });
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
