import Vue from "vue";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
//axios的封装
import request from "@/network/request";

Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  request, //注册axios
  render: h => h(App)
}).$mount("#app");
