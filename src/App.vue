<!--
 * @Author: your name
 * @Date: 2020-11-25 10:39:43
 * @LastEditTime: 2021-05-04 14:40:01
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sn-element\src\App.vue
-->
<template>
  <div id="app">
    <!-- <router-view v-if="isRouterAlive"></router-view> -->

    <keep-alive>
      <!--      //当前进入的路由 meta里面 keepAlive为true时走这里-->
      <router-view v-if="$route.meta.keepAlive" class="home-router"></router-view>
    </keep-alive>
    <!--    当前进入的路由 meta里面 keepAlive为false时走这里 下面 if 判断进行了取反处理-->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  // import SnHeader from "./views/SnHeader/SnHeader.vue";
  export default {
    name: "app",
    components: {
      // Sidebar,
      // SnHeader
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
    created() {
      this.login();
    },
    methods: {
      reload() {
        this.isRouterAlive = false; //先关闭，
        this.$nextTick(function () {
          this.isRouterAlive = true; //再打开
        });
      },

      
    }
  };
</script>
<style lang="scss">
  #app {
    background-color: #f5f7f8;
  }
</style>
