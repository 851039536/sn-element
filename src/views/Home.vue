<!--
 * @Author: your name
 * @Date: 2020-11-25 10:39:43
 * @LastEditTime: 2021-07-28 09:02:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \sn-element\src\views\Home.vue
-->
<template>
  <div>
    <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>
    <keep-alive>
      <!--      //当前进入的路由 meta里面 keepAlive为true时走这里-->
      <router-view v-if="$route.meta.keepAlive" class="home-router"></router-view>
    </keep-alive>
    <!--    当前进入的路由 meta里面 keepAlive为false时走这里 下面 if 判断进行了取反处理-->
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  export default {
    name: "Home",
    components: {}
  };
</script>
<style>
  .home {
    /*height: 100px;*/
    /*width: 100%;*/
    /*background-color: #ee7700;*/
  }
</style>
