import Vue from "vue";

import mavonEditor from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import App from "./App.vue";
import router from "./router";
import store from "./store";
//axios的封装
import request from "@/network/request";
import ajax from "./api/index";
Vue.prototype.$api = ajax; // 将api挂载到vue的原型上

Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.use(mavonEditor);
new Vue({
  router,
  store,
  request, //注册axios
  render: h => h(App)
}).$mount("#app");
