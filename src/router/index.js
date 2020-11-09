import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

//push
const VueRouterPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(to) {
  return VueRouterPush.call(this, to).catch(err => err);
};

//replace
const VueRouterReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(to) {
  return VueRouterReplace.call(this, to).catch(err => err);
};

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/SnNavigation",
    name: "SnNavigation",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/SnNavTest/SnNavigation.vue"
      )
  },
  {
    path: "/Navigationform",
    name: "Navigationform",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/SnUpForm/Navigationform.vue"
      )
  },
  {
    path: "/VideoUpform",
    name: "VideoUpform",

    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/SnUpForm/VideoUpform.vue"
      )
  },
  {
    path: "/ArticleUpform",
    name: "ArticleUpform",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/SnUpForm/ArticleUpform.vue"
      )
  },
  {
    path: "/UserTalkUpform",
    name: "UserTalkUpform",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/SnUpForm/UserTalkUpform.vue"
      )
  },
  {
    path: "/UserUpform",
    name: "UserUpform",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SnUpForm/UserUpform.vue")
  },
  {
    path: "/SnLabelsUpform",
    name: "SnLabelsUpform",

    component: () => import("../views/SnUpForm/SnLabelsUpform.vue")
  },
  {
    path: "/SnSortUpform",
    name: "SnSortUpform",

    component: () => import("../views/SnUpForm/SnSortUpform.vue")
  },
  {
    path: "/SnVideo",
    name: "SnVideo",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SnNavTest/SnVideo.vue")
  },
  {
    path: "/SnArticle",
    name: "SnArticle",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SnNavTest/SnArticle.vue")
  },
  {
    path: "/SnUser",
    name: "SnUser",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SnNavTest/SnUser.vue")
  },
  {
    path: "/SnUserTalk",
    name: "SnUserTalk",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/SnNavTest/SnUserTalk.vue"
      )
  },

  {
    path: "/Navform",
    name: "Navform",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SnForm/Navform.vue")
  },
  {
    path: "/Videoform",
    name: "Videoform",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SnForm/Videoform.vue")
  },
  {
    path: "/ArticleAddform",
    name: "ArticleAddform",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/SnForm/ArticleAddform.vue"
      )
  },
  {
    path: "/UserAddform",
    name: "UserAddform",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SnForm/UserAddform.vue")
  },
  {
    path: "/UserTalkAddform",
    name: "UserTalkAddform",
    component: () => import("../views/SnForm/UserTalkAddform.vue")
  },
  {
    path: "/SnSortAddform",
    name: "SnSortAddform",
    component: () => import("../views/SnForm/SnSortAddform.vue")
  },
  {
    path: "/SnLabelsAddform",
    name: "SnLabelsAddform",
    component: () => import("../views/SnForm/SnLabelsAddform.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
