import firebase from "firebase";

const state = {
  tasks: [],
};

const getters = {
  tasks(state) {
    let tasks = state.tasks;
    tasks.sort((a, b) => {
      if (a.data.dueDate < b.data.dueDate) return -1;
      if (a.data.dueDate > b.data.dueDate) return 1;
    });
    return tasks;
  },
};

const mutations = {
  setTasks(state, data) {
    state.tasks.push(data);
  },
  doneTask(state, id) {
    state.tasks = state.tasks.filter((el) => {
      console.log(el.id);
      console.log(id);
      return el.id != id;
    });
    console.log(state.tasks);
  },
  addTask(state, newTask) {
    state.tasks.push(newTask);
  },
};

const actions = {
  doneTask({ commit }, { id }) {
    firebase
      .firestore()
      .collection("tasks")
      .doc(id)
      .delete()
      .then(() => {
        commit("doneTask", id);
      });
  },
  addTask({ commit }, newTask) {
    firebase
      .firestore()
      .collection("tasks")
      .add(newTask)
      .then((doc) => {
        commit("addTask", { id: doc.id, data: newTask });
      });
  },
  fetchTasks({ commit }) {
    firebase
      .firestore()
      .collection("tasks")
      .get()
      .then((response) => {
        console.log(response);
        response.forEach((doc) =>
          commit("setTasks", { id: doc.id, data: doc.data() })
        );
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
