import firebase from 'firebase';

const state = {
  tasks: []
};

const getters = {
  tasks(state) {
    const tasks = state.tasks;

    tasks.sort((a, b) => {
      if (a.data.dueDate.seconds < b.data.dueDate.seconds) return -1;
      if (a.data.dueDate.seconds > b.data.dueDate.seconds) return 1;
    });
    return tasks;
  }
};

const mutations = {
  fetchTasks(state, data) {
    state.tasks.push(data);
  },
  doneTask(state, id) {
    state.tasks = state.tasks.filter(el => {
      return el.id != id;
    });
  },
  addTask(state, newTask) {
    state.tasks.push(newTask);
  }
};

const actions = {
  fetchTasks({ commit }) {
    firebase
      .firestore()
      .collection('tasks')
      .get()
      .then(response => {
        response.forEach(doc =>
          commit('fetchTasks', { id: doc.id, data: doc.data() })
        );
      });
  },
  doneTask({ commit }, { id }) {
    firebase
      .firestore()
      .collection('tasks')
      .doc(id)
      .delete()
      .then(() => {
        commit('doneTask', id);
      });
  },
  addTask({ commit }, newTask) {
    firebase
      .firestore()
      .collection('tasks')
      .add(newTask)
      .then(doc => {
        commit('addTask', { id: doc.id, data: newTask });
      });
  }
};

const tasksModule = {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};

export default tasksModule;
