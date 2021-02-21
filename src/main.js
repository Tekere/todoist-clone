import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import VueAxios from "vue-axios";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";

UIkit.use(Icons);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  axios,
  created() {
    let that = this;
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
        that.$store.dispatch("setTasks", tasks);

        console.log("tasksSuccess");
      })
      .catch((e) => {
        console.log("tasksFailed");
        alert(e);
      });
    axios
      .get(
        "https://firestore.googleapis.com/v1/projects/todoist-clone-c2bd0/databases/(default)/documents/projects"
      )
      .then((response) => {
        let projects = response.data.documents;
        that.$store.dispatch("setProjects", projects);

        // //プロジェクトを扱いやすいよう配列にしてstateに保存;
        // that.$store.dispatch("setProjectNames", projects);
        console.log("projectsSuccess");
      })
      .catch((e) => {
        console.log("projectsFailed");
        alert(e);
      });
  },

  render: (h) => h(App),
}).$mount("#app");
