/*
 * @Author: your name
 * @Date: 2020-11-25 10:39:43
 * @LastEditTime: 2021-07-28 15:25:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sn-element\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 存储token
    Authorization: localStorage.getItem("Authorization") ?
      localStorage.getItem("Authorization") : "",
    // 是否更新 0 1更新
    upIndex: 0
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin(state, user) {
      state.Authorization = user.Authorization;
      localStorage.setItem("Authorization", user.Authorization);
    }
  }
});
export default store;