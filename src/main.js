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

const app = new Vue({
  router,
  store,
  axios,
  render: (h) => h(App),
  created() {
    let that = this;
    async function getApiData() {
      // ローディング
      // console.log("wait");

      // firebaseからtasksを取得
      await axios
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
          that.$store.dispatch("tasksModule/setTasks", tasks);

          console.log("tasksSuccess");
        })
        .catch((e) => {
          console.log("tasksFailed");
          alert(e);
        });
      // firebaseからprojectsを取得
      await axios
        .get(
          "https://firestore.googleapis.com/v1/projects/todoist-clone-c2bd0/databases/(default)/documents/projects"
        )
        .then((response) => {
          let projects = response.data.documents;
          that.$store.dispatch("projectsModule/setProjects", projects);

          //プロジェクトを扱いやすいよう配列にしてstateに保存;
          that.$store.dispatch("projectsModule/setProjectsArray", projects);
          console.log("projectsSuccess");
        })
        .catch((e) => {
          console.log("projectsFailed");
          alert(e);
        });
      // マウント
      app.$mount("#app");
    }
    getApiData();
  },
});
