import Vue from "vue";
import VueRouter from "vue-router";
import SnNavigation from "../views/SnNavTest/SnNavigation.vue";

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
    name: "SnNavigation",
    component: SnNavigation
  },
  {
    path: "/SnNavigation",
    name: "SnNavigation",
    component: () => import("../views/SnNavTest/SnNavigation.vue")
  },
  {
    path: "/SnPicture",
    name: "SnPicture",
    component: () => import("../views/SnNavTest/SnPicture.vue")
  },
  {
    path: "/SnOne",
    name: "SnOne",
    component: () => import("../views/SnNavTest/SnOne.vue")
  },
  {
    path: "/Navigationform",
    name: "Navigationform",
    component: () => import("../views/SnUpForm/Navigationform.vue")
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
    path: "/SnPictureUpform",
    name: "SnPictureUpform",

    component: () => import("../views/SnUpForm/SnPictureUpform.vue")
  },
  {
    path: "/TalkUpform",
    name: "TalkUpform",

    component: () => import("../views/SnUpForm/TalkUpform.vue")
  },
  {
    path: "/SnSortUpform",
    name: "SnSortUpform",
    component: () => import("../views/SnUpForm/SnSortUpform.vue")
  },
  {
    path: "/OneUp",
    name: "OneUp",
    component: () => import("../views/SnUpForm/OneUp.vue")
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
    path: "/SnTalk",
    name: "SnTalk",
    component: () => import("../views/SnNavTest/SnTalk.vue")
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
    path: "/TalkAddform",
    name: "TalkAddform",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/SnForm/TalkAddform.vue")
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
    path: "/SnPictureAddform",
    name: "SnPictureAddform",
    component: () => import("../views/SnForm/SnPictureAddform.vue")
  },
  {
    path: "/SnSortAddform",
    name: "SnSortAddform",
    component: () => import("../views/SnForm/SnSortAddform.vue")
  },
  ,
  {
    path: "/SnLogin",
    name: "SnLogin",
    component: () => import("../views/SnLogin.vue")
  },
  {
    path: "/SnLabelsAddform",
    name: "SnLabelsAddform",
    component: () => import("../views/SnForm/SnLabelsAddform.vue")
  },
  {
    path: "/OneAdd",
    name: "OneAdd",
    component: () => import("../views/SnForm/OneAdd.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
