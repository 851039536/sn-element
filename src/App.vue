<template>
  <div id="app">
    <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <!-- 侧边栏 -->
    <Sidebar></Sidebar>
    <router-view />
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
  }
};
</script>
<style lang="scss">
#app {
}
</style>
