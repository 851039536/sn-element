<!--
 * @Author: your name
 * @Date: 2020-11-25 10:39:43
 * @LastEditTime: 2021-07-28 15:50:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sn-element\src\App.vue
-->
<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive"></router-view> -->
    <home v-if="isRouterAlive"></home>
  </div>
</template>

<script>
  import Home from './views/Home.vue';
  export default {
    name: "app",
    components: {
      Home
    },
    provide() {
      //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
      return {
        reload: this.reload
      };
    },
    data() {
      return {
        isRouterAlive: true //控制视图是否显示的变量
      };
    },
    methods: {
      reload() {
        this.isRouterAlive = false; //先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true; //再打开
        });
      }
    }
  };
</script>
<style lang="scss">
  #app {
    /*background-color: #f5f7f8;*/
    @apply bg-gray-100;
  }
</style>
