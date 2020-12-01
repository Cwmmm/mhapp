import Vue from "vue";
import VueRouter from "vue-router";
// import Error from "../views/404.vue";
// import Comic from "../views/Comic.vue";
// import Tag from "../views/Tag.vue";
// import Reader from "../views/Reader.vue";
// import Sign from "../views/sign/index.vue";
// import Login from "../views/sign/login.vue";
// import SignUp from "../views/sign/signup.vue";
// import Rank from "../views/Rank.vue";
// import Homepage from "../views/homepage/Homepage.vue";
// import info from "../views/homepage/info.vue";
// import collect from "../views/homepage/collect.vue";
// import history from "../views/homepage/history.vue";
// import comment from "../views/homepage/comment.vue";
// import like from "../views/homepage/like.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: () => import("../views/index/Index.vue")
  },
  {
    path: "/index",
    redirect: "/"
  },
  {
    path: "/comic/:id",
    component: () => import("../views/Comic.vue")
  },
  {
    path: "/tag/:id",
    component: () => import("../views/Tag.vue")
  },
  {
    path: "/reader/:id",
    component: () => import("../views/Reader.vue")
  },
  {
    path: "/sign",
    component: () => import("../views/sign/index.vue"),
    children: [
      {
        path: "",
        redirect: "login"
      },
      {
        path: "login",
        component: () => import("../views/sign/login.vue")
      },
      {
        path: "signup",
        component: () => import("../views/sign/signup.vue")
      }
    ]
  },
  {
    path: "/homepage",
    component: () => import("../views/homepage/Homepage.vue"),
    children: [
      {
        path: "",
        redirect: "info"
      },
      {
        path: "info",
        component: () => import("../views/homepage/info.vue")
      },
      {
        path: "collect",
        component: () => import("../views/homepage/collect.vue")
      },
      {
        path: "record",
        component: () => import("../views/homepage/history.vue")
      },
      {
        path: "comment",
        component: () => import("../views/homepage/comment.vue")
      },
      {
        path: "like",
        component: () => import("../views/homepage/like.vue")
      }
    ]
  },
  {
    path: "/rank",
    component: () => import("../views/Rank.vue")
  },
  {
    path: "*",
    component: () => import("../views/404.vue")
  }
];

const router = new VueRouter({
  routes,
  mode: "history"
});

export default router;
