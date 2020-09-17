<template>
  <div class="sn-SnHeader">
    <div class="sn-SnHeader-1">
      <el-menu
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
      >
        <el-menu-item index="1">处理中心</el-menu-item>
        <el-submenu index="2">
          <template slot="title">我的工作台</template>
          <el-menu-item index="2-1">选项1</el-menu-item>
          <el-menu-item index="2-2">选项2</el-menu-item>
          <el-menu-item index="2-3">选项3</el-menu-item>
          <el-submenu index="2-4">
            <template slot="title">选项4</template>
            <el-menu-item index="2-4-1">选项1</el-menu-item>
            <el-menu-item index="2-4-2">选项2</el-menu-item>
            <el-menu-item index="2-4-3">选项3</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>消息中心</el-menu-item>
        <el-menu-item index="4"
          ><a href="http://129.204.92.64/" target="_blank"
            >博客</a
          ></el-menu-item
        >
        <el-menu-item class="sn-SnHeader-1-1" index="5" align="right">
          <el-avatar> user </el-avatar>
        </el-menu-item>
        <el-menu-item class="sn-SnHeader-1-1" index="6" align="right">
          <a href="http://129.204.92.64:8888/J7YoPEa9/" target="_blank">宝塔</a>
        </el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>
export default {
  name: "SnHeader",
  components: {},
  data() {
    return {
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style lang="scss" scoped>
.sn-SnHeader {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;

  .sn-SnHeader-1 {
    .sn-SnHeader-1-1 {
      // background-color: #221a0f;
      float: right;
    }
  }
}

.el-footer {
  /* 	background-color: #b3c0d1; */
  color: #333;
  text-align: center;
  line-height: 60px;
}
</style>
