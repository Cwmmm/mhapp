import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index/Index.vue";
import Error from "../views/404.vue";
import Login from "../views/Login.vue";
import Regist from "../views/Regist.vue";
import Comic from "../views/Comic.vue";
import Tag from "../views/Tag.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/index",
    redirect: "/"
  },
  {
    path: "/comic/:id",
    component: Comic
  },
  {
    path: "/tag/:id",
    component: Tag
  },
  {
    path: "/sign",
    component: Login
  },
  {
    path: "/regist",
    component: Regist
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  },
  {
    path: "*",
    component: Error
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
