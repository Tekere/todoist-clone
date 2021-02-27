import axios from "axios";

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
  doneTask(state, data) {
    //
  },
  addTask(state, data) {
    state.tasks.push(data);
  },
};

const actions = {
  setTasks({ commit }) {
    axios
      .get(
        "https://firestore.googleapis.com/v1/projects/todoist-clone-c2bd0/databases/(default)/documents/tasks"
      )
      .then((response) => {
        let tasks = response.data.documents;
        tasks.sort((a, b) => {
          if (
            a.fields.dueDate.timestampValue > b.fields.dueDate.timestampValue
          ) {
            return 1;
          } else {
            return -1;
          }
        });

        console.log("tasksSuccess");
        commit("setTasks", tasks);
      })
      .catch((e) => {
        console.log("tasksFailed");
        alert(e);
      });
  },
  doneTask({ commit }, task) {
    let id = task.name.split();
    id = id[id.length - 1];
    axios
      .delete(
        "https://firestore.googleapis.com/v1/projects/todoist-clone-c2bd0/databases/(default)/documents/tasks/" +
          id
      )
      .then(console.log("hello"));
    commit("doneTask", task);
  },
  addTask(data) {
    axios.post(
      "https://firestore.googleapis.com/v1/projects/todoist-clone-c2bd0/databases/(default)/documents/tasks",
      {
        fields: {
          title: {
            stringValue: "yyy",
          },
          dueDate: {
            timestampValue: "2021-02-28T15:00:00Z",
          },
          status: {
            integerValue: "0",
          },
        },
      }
    );
    // commit("addTask", data);
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
