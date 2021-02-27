import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
// import firebase from "firebase";
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
}).$mount("#app");
