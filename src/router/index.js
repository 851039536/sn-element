import Vue from "vue";
import VueRouter from "vue-router";
import SnLogin from "../views/SnLogin.vue";
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

// eslint-disable-next-line no-sparse-arrays
const routes = [{
    path: "/",
    name: "SnLogin",
    component: SnLogin
  },
  {
    path: "/SnNavigation",
    name: "SnNavigation",
    meta: {
      title: "SnNavigation",
      keepAlive: true, // 此组件需要被缓存
    },
    component: () => import("../views/snNavigation/SnNavigation.vue")
  },
  {
    path: "/Transfer",
    name: "Transfer",
    meta: {
      title: "Transfer",
      keepAlive: false // 缓存
    },
    component: () => import("../views/common/Transfer.vue")
  },
  {
    path: "/SnPicture",
    name: "SnPicture",
    meta: {
      title: "SnPicture",
      keepAlive: false // 缓存
    },
    component: () => import("../views/SnNavTest/SnPicture.vue")
  },
  {
    path: "/SnOne",
    name: "SnOne",
    meta: {
      title: "SnOne",
      keepAlive: false // 缓存
    },
    component: () => import("../views/snOne/SnOne.vue")
  },
  {
    path: "/Home",
    name: "Home",
    meta: {
      title: "Home",
      keepAlive: false // 缓存
    },
    component: () => import("../views/Home.vue")
  },
  {
    path: "/SnNavigationUp",
    name: "SnNavigationUp",
    component: () => import("../views/snNavigation/SnNavigationUp.vue")
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
    path: "/ArticleUp",
    name: "ArticleUp",
    component: () =>
      import(
        /* webpackChunkName: "about" */
        "../views/snArticle/ArticleUp.vue"
      )
  },
  {
    path: "/UserTalkUpform",
    name: "UserTalkUpform",
    component: () => import("../views/SnUpForm/UserTalkUpform.vue")
  },
  {
    path: "/UserUpform",
    name: "UserUpform",

    component: () =>
      import( /* webpackChunkName: "about" */ "../views/SnUpForm/UserUpform.vue")
  },
  {
    path: "/SnLabelsUp",
    name: "SnLabelsUp",

    component: () => import("../views/SnLabels/SnLabelsUp.vue")
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
    meta: {
      title: "SnVideo",
      keepAlive: false
    },
    component: () => import("../views/SnNavTest/SnVideo.vue")
  },
  {
    path: "/SnArticle",
    name: "SnArticle",
    meta: {
      title: "SnArticle",
      keepAlive: true
    },
    component: () => import("../views/snArticle/SnArticle.vue")
  },
  {
    path: "/SnTalk",
    name: "SnTalk",
    meta: {
      title: "SnTalk",
      keepAlive: false // 缓存
    },
    component: () => import("../views/SnNavTest/SnTalk.vue")
  },
  {
    path: "/SnUser",
    name: "SnUser",
    meta: {
      title: "SnUser",
      keepAlive: false // 缓存
    },
    component: () => import("../views/SnNavTest/SnUser.vue")
  },
  {
    path: "/SnUserTalk",
    name: "SnUserTalk",
    meta: {
      title: "SnUserTalk",
      keepAlive: false // 缓存
    },
    component: () => import("../views/SnNavTest/SnUserTalk.vue")
  },

  {
    path: "/SnNavigationAdd",
    name: "SnNavigationAdd",
    component: () => import("../views/snNavigation/SnNavigationAdd.vue")
  },
  {
    path: "/Videoform",
    name: "Videoform",
    component: () => import("../views/SnForm/Videoform.vue")
  },
  {
    path: "/TalkAddform",
    name: "TalkAddform",
    component: () => import("../views/SnForm/TalkAddform.vue")
  },
  {
    path: "/ArticleAdd",
    name: "ArticleAdd",
    component: () => import("../views/snArticle/ArticleAdd.vue")
  },
  {
    path: "/UserAddform",
    name: "UserAddform",
    component: () => import("../views/SnForm/UserAddform.vue")
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
    path: "/SnSortAdd",
    name: "SnSortAdd",
    component: () => import("../views/snSort/SnSortAdd.vue")
  }, ,
  {
    path: "/SnLogin",
    name: "SnLogin",
    component: () => import("../views/SnLogin.vue")
  },
  {
    path: "/SnLabelsAdd",
    name: "SnLabelsAdd",
    component: () => import("../views/SnLabels/SnLabelsAdd.vue")
  },
  {
    path: "/SnOneAdd",
    name: "SnOneAdd",
    component: () => import("../views/snOne/SnOneAdd.vue")
  }
];

const router = new VueRouter({
  routes
});
// 导航守卫
// 使用 router.beforeEach 注册一个全局前置守卫，判断用户是否登陆
router.beforeEach((to, from, next) => {
  if (to.path === "/SnLogin") {
    next();
  } else {
    let token = localStorage.getItem("Authorization");

    if (token === "null" || token === "") {
      next("/SnLogin");
    } else {
      next();
    }
  }
});
export default router;