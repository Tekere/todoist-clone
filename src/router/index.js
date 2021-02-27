import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "inbox",
    component: () => import("../views/Inbox.vue"),
  },
  {
    path: "/today",
    name: "today",
    component: () => import("../views/Today.vue"),
  },
  {
    path: "/fewday",
    name: "fewday",
    component: () => import("../views/Fewday.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
