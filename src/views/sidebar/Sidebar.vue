<template>
  <div class="Sidebar">
    <el-aside width="100%">
      <el-row class="tac">
        <el-col :span="24">
          <el-menu class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-setting"></i>
                <span>个人设置</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="1-1" @click.native="SnNavigation(6)">图床管理</el-menu-item>
                <el-menu-item index="
								 1-2" @click.native="SnNavigation(9)">博客设置</el-menu-item>
              </el-menu-item-group>

              <el-submenu index="1-4">
                <template slot="title">选项4</template>
                <el-menu-item index="1-4-1">选项1</el-menu-item>
              </el-submenu>
            </el-submenu>
            <el-menu-item index="2" @click.native="SnNavigation(1)">
              <i class="el-icon-reading"></i>
              <span slot="title">分享</span>
            </el-menu-item>
            <el-menu-item index="3" @click.native="SnNavigation(2)">
              <i class="el-icon-notebook-2"></i>
              <span slot="title">文章</span>
            </el-menu-item>
            <el-menu-item index="4" @click.native="SnNavigation(3)">
              <i class="el-icon-chat-square"></i>
              <span slot="title">视频</span>
            </el-menu-item>
            <el-menu-item index="5" @click.native="SnNavigation(4)">
              <i class="el-icon-chat-square"></i>
              <span slot="title">用户</span>
            </el-menu-item>
            <el-menu-item index="6" @click.native="SnNavigation(5)">
              <i class="el-icon-chat-square"></i>
              <span slot="title">说说</span>
            </el-menu-item>
            <el-menu-item index="7" @click.native="SnNavigation(7)">
              <i class="el-icon-document"></i>
              <span slot="title">日志</span>
            </el-menu-item>
            <el-menu-item index="8" @click.native="SnNavigation(8)">
              <i class="el-icon-document"></i>
              <span slot="title">One</span>
            </el-menu-item>
          </el-menu>
        </el-col>
      </el-row>
    </el-aside>
  </div>
</template>

<script>
  export default {
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },

      SnNavigation(id) {
        switch (id) {
          case 1:
            // this.$router.push("./SnNavigation");
            this.$router.push({
              path: "./SnNavigation",
              query: {
                t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
              }
            })
            break;
          case 2:
            this.$router.push("/SnArticle");
            break;
          case 3:
            this.$router.push("/SnVideo");
            break;
          case 4:
            this.$router.push("/SnUser");
            break;
          case 5:
            this.$router.push("/SnUserTalk");
            break;
          case 6:
            this.$router.push("/SnPicture");
            break;
          case 7:
            this.$router.push("/SnTalk");
            break;
          case 8:
            this.$router.push("/SnOne");
            break;
          case 9:
            this.$router.push("/SetBlog");
            break;
          default:
            this.$router.push("./SnLogin");
            break;
        }
      }
    }
  };
</script>

<style scoped>
  .Sidebar {
    position: fixed;
    top: 61px;
    z-index: 1;
    background-color: white;
    height: 100%;
    width: 19%;
  }

  .el-aside {
    color: #333;
    text-align: center;
    line-height: 200px;
  }
</style>
