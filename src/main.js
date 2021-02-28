import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import firebase from "firebase";
import UIkit from "uikit";
import Icons from "uikit/dist/js/uikit-icons";
import "uikit/dist/css/uikit.min.css";
UIkit.use(Icons);

let firebaseConfig = {
  apiKey: "AIzaSyCzNcuFT1x448qJSa9BXka6gzmcXY1eeTI",
  authDomain: "todoist-clone-c2bd0.firebaseapp.com",
  projectId: "todoist-clone-c2bd0",
  storageBucket: "todoist-clone-c2bd0.appspot.com",
  messagingSenderId: "408990222799",
  appId: "1:408990222799:web:8de9afdbac895ffcc8eaba",
  measurementId: "G-FX8ZJW94QC",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
