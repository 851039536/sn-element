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
        /* webpackChunkName: "about" */ "../views/SnNavTest/SnNavigation.vue"
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
        /* webpackChunkName: "about" */ "../views/SnUpForm/Navigationform.vue"
      )
  },
  {
    path: "/VideoUpform",
    name: "VideoUpform",

    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/SnUpForm/VideoUpform.vue"
      )
  },
  {
    path: "/ArticleUpform",
    name: "ArticleUpform",

    component: () =>
      import(
        /* webpackChunkName: "about" */ "../views/SnUpForm/ArticleUpform.vue"
      )
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
        /* webpackChunkName: "about" */ "../views/SnForm/ArticleAddform.vue"
      )
  }
];

const router = new VueRouter({
  routes
});

export default router;
