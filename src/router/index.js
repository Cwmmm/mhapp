import Vue from "vue";
import VueRouter from "vue-router";
import Index from "../views/index/Index.vue";
import Error from "../views/404.vue";
import Comic from "../views/Comic.vue";
import Tag from "../views/Tag.vue";
import Reader from "../views/Reader.vue";
import Sign from "../views/sign/index.vue";
import Login from "../views/sign/login.vue";
import SignUp from "../views/sign/signup.vue";

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
    path: "/reader/:id",
    component: Reader
  },
  {
    path: "/sign",
    component: Sign,
    children: [
      {
        path: "",
        redirect: "login"
      },
      {
        path: "login",
        component: Login
      },
      {
        path: "signup",
        component: SignUp
      }
    ]
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
