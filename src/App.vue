<template>
  <div id="app">
    <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <!-- 侧边栏 -->
    <Sidebar></Sidebar>
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import Sidebar from "./views/sidebar/Sidebar.vue";
import SnHeader from "./views/SnHeader/SnHeader.vue";
export default {
  name: "app",
  components: {
    Sidebar,
    SnHeader
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
      this.$nextTick(function() {
        this.isRouterAlive = true; //再打开
      });
    }
  }
};
</script>
<style lang="scss">
#app {
  background-color: #f5f7f8;
}
</style>
