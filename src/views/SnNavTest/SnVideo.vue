<template>
  <div>
    <!-- <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>-->
    <div class="SnNavigation">
      <div class="SnArticle-3">
        <div class="SnArticle-3-1" v-for="info in videoData" :key="info.vId">
          <el-link :underline="false" @click="alltype(info.vId)">
            {{
            info.vType
            }}
          </el-link>
        </div>
      </div>
      <!-- 升序降序 -->
      <div class="SnArticle-1">
        排序
        <el-switch
          v-model="value"
          @click.native="sx(value)"
          active-color="#13ce66"
          inactive-color="#ff4949"
          active-value="true"
          inactive-value="false"
        >></el-switch>
      </div>

      <!-- tab列表 -->
      <div class="SnNavigation-2">
        <el-main>
          <el-table
            v-loading.fullscreen.lock="fullscreenLoading"
            :data="
              tableData.filter(
                data =>
                  !search ||
                  data.name.toLowerCase().includes(search.toLowerCase())
              )
            "
            :border="true"
            size="small"
            :highlight-current-row="true"
            ss
            style="width: 100% "
          >
            <el-table-column label="vId" prop="vId"></el-table-column>
            <el-table-column label="vData" prop="vData"></el-table-column>
            <el-table-column label="vTitle" prop="vTitle"></el-table-column>
            <el-table-column label="vTypeid" prop="vTypeid"></el-table-column>
            <el-table-column align="right">
              <template slot="header">
                <el-link type="primary" @click.native="add(1)">添加信息</el-link>
              </template>
              <template slot-scope="scope">
                <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                >Delete</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </div>
      <!-- 分页 -->
      <el-pagination
        @current-change="current_change"
        :page="page"
        :page-size="pagesize"
        layout="prev, pager, next"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SnVideo",
    inject: ["reload"],
    data() {
      return {
        tableData: [],
        search: "",
        total: 20, //默认数据总数
        page: 1, //当前页码
        pagesize: 8, //每页的数据条数
        vtype: 99999, //默认所有
        fullscreenLoading: false,
        value: "true",
        videoData: [],
        typeid: ""
      };
    },

    created() {
      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 300);
      // this.GetNavigationCount();
      // this.GetSnNavigation();
      this.getall();
    },
    methods: {
      // 初始化加载
      getall() {
        this.$api
          .all([
            //总数
            this.$api.get("/api/SnVideo/GetVideoCount"),
            //分页
            this.$api.get(
              "/api/SnVideo/GetfyVideo?type=" +
              this.vtype +
              "&pageIndex=" +
              this.page +
              "&pageSize=" +
              this.pagesize +
              "&isDesc=" +
              this.value
            ),
            // 加载分类
            this.$api.get("/api/SnVideoType/AsyGestTest")
          ])
          .then(
            this.$api.spread((res1, res2, res3) => {
              this.total = res1.data;
              this.tableData = res2.data;
              this.videoData = res3.data;
            })
          )
          .catch(err => {
            console.log(err);
          });
      },

      sx(value) {
        this.GetSnNavigation(1, value);
      },

      handleEdit(index, row) {
        console.log(index, row.vId, 111111);

        // .带参数跳转
        this.$router.push({
          path: "./VideoUpform",
          query: {
            id: row.vId
          }
        });
        // this.$router.push("./Navigationform");
      },
      handleDelete(index, row) {
        console.log(index, row.vId);

        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api({
              url: "/api/SnVideo/AsyDetVideo?id=" + row.vId,
              method: "delete"
            })
              .then(res => {
                console.log(res.data);
                if (res.data === "删除成功") {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });

                  this.reload();
                  // this.getgjtype("vue"); // 重新加载数据
                  // this.reload(); // 刷新页面
                } else {
                  this.$message({
                    type: "info",
                    message: "删除失败"
                  });
                }
              })
              .catch(console.error.bind(console)); // 异常
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "已取消删除"
            });
          });
      },

      GetSnNavigation() {
        this.$api({
          url:
            "/api/SnVideo/GetfyVideo?type=" +
            this.vtype +
            "&pageIndex=" +
            this.page +
            "&pageSize=" +
            this.pagesize +
            "&isDesc=" +
            this.value
        })
          .then(res => {
            this.tableData = res.data;
          })
          .catch(e => {
            console.log(e + "获取数据失败");
          });

        // 加载分类
        this.$api({
          url: "/api/SnVideoType/AsyGestTest"
        })
          .then(res => {
            this.videoData = res.data;
          })
          .catch(e => {
            console.log(e + "获取数据失败");
          });
      },
      current_change(val) {
        this.page = val;
        this.GetSnNavigation(this.page, this.value);
      },
      add() {
        this.$router.push("./Videoform");
      },
      alltype(typeid) {
        this.vtype = typeid;

        this.$api
          .all([
            //总数
            this.$api.get("/api/SnVideo/GetVideoCountType?type=" + this.vtype),
            //分页
            this.$api.get(
              "/api/SnVideo/GetfyVideo?type=" +
              this.vtype +
              "&pageIndex=" +
              this.page +
              "&pageSize=" +
              this.pagesize +
              "&isDesc=" +
              this.value
            )
            // 加载分类
          ])
          .then(
            this.$api.spread((res1, res2) => {
              this.total = res1.data;
              this.tableData = res2.data;
            })
          )
          .catch(err => {
            console.log(err);
          });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .SnNavigation {
    background-color: white;
    width: 78%;
    margin-left: 20%;
    @apply mt-2;
    position: relative;
    .SnArticle-1 {
      position: absolute;
      top: 69px;
      right: 110px;
      z-index: 1;
    }
    .SnNavigation-1 {
      // background-color: #42b983;
      padding-right: 40px;
    }

    .SnNavigation-2 {
      margin: 10px 0 10px 0;
    }

    .SnArticle-3 {
      .el-link {
        margin-left: 10px;
        padding: 5px;
      }
    }
    .SnArticle-3-1 {
      display: inline-block;
      .el-link {
        font-size: 0.8125rem;
      }
    }
  }
</style>
