<template>
  <div>
    <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>
    <div class="SnArticle">
      <el-tabs type="border-card">
        <el-tab-pane label="文章管理">
          <div class="SnArticle-3">
            <div
              class="SnArticle-3-1"
              v-for="info in LabelsData"
              :key="info.pictureTypeId"
            >
              <el-link
                :underline="false"
                @click="alltype(info.pictureTypeId)"
                >{{ info.pictureTypeName }}</el-link
              >
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
            >
              >
            </el-switch>
          </div>

          <!-- tab列表 -->
          <div class="SnArticle-2">
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
                style="width: 100% "
              >
                <el-table-column label="pictureId" prop="pictureId">
                </el-table-column>
                <el-table-column label="pictureUrl" prop="pictureUrl">
                </el-table-column>
                <el-table-column label="pictureTitle" prop="pictureTitle">
                </el-table-column>
                <el-table-column label="pictureTypeId" prop="pictureTypeId">
                </el-table-column>
                <el-table-column align="right">
                  <template slot="header">
                    <el-link type="primary" @click.native="add(1)"
                      >添加信息</el-link
                    >
                  </template>
                  <template slot-scope="scope">
                    <el-button
                      size="mini"
                      @click="handleEdit(scope.$index, scope.row)"
                      >Edit</el-button
                    >
                    <el-button
                      size="mini"
                      type="danger"
                      @click="handleDelete(scope.$index, scope.row)"
                      >Delete</el-button
                    >
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
        </el-tab-pane>
        <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
  name: "SnPictures",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      search: "",
      total: 0, //默认数据总数
      page: 1, //当前页码
      pagesize: 8, //每页的数据条数
      fullscreenLoading: false,
      lbtype: "00",
      value: "true",
      LabelsData: []
    };
  },

  created() {
    this.fullscreenLoading = true;
    setTimeout(() => {
      this.fullscreenLoading = false;
    }, 200);
    this.getall();
  },
  methods: {
    sx(value) {
      this.SnArticle(1, value);
    },

    // 初始化加载
    getall() {
      this.$api
        .all([
          //总数
          this.$api.get("/api/SnPicture/CountAsync"),
          //分页
          this.$api.get(
            "/api/SnPicture/GetFyAllAsync?pageIndex=" +
              this.page +
              "&pageSize=" +
              this.pagesize +
              "&isDesc=" +
              this.value
          ),
          // 加载分类
          this.$api.get("/api/SnPictureType/GetAllAsync")
        ])
        .then(
          this.$api.spread((res1, res2, res3) => {
            this.total = res1.data;
            this.tableData = res2.data;
            this.LabelsData = res3.data;
          })
        )
        .catch(err => {
          console.log(err);
        });
    },

    current_change(val) {
      this.page = val;
      this.SnArticle();
    },
    handleEdit(index, row) {
      // .带参数跳转
      this.$router.push({
        path: "./SnPictureUpform",
        query: {
          id: row.pictureId
        }
      });
    },
    handleDelete(index, row) {
      alert(row.pictureId);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$api({
            url: "/api/SnPicture/DeleteAsync?id=" + row.pictureId,
            method: "delete"
          })
            .then(res => {
              console.log(res.data);
              if (res.data === true) {
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

    SnArticle() {
      this.$api({
        url:
          "/api/SnPicture/GetFyAllAsync?pageIndex=" +
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

      // // 加载分类
      // this.$api({
      //   url: "/api/SnLabels/GetLabels"
      // })
      //   .then(res => {
      //     this.LabelsData = res.data;
      //   })
      //   .catch(e => {
      //     console.log(e + "获取数据失败");
      //   });
    },
    add() {
      this.$router.push("./SnPictureAddform");
    },
    alltype(typeid) {
      this.lbtype = typeid;
      this.$api
        .all([
          //总数
          this.$api.get("/api/SnPicture/CountTypeAsync?type=" + this.lbtype),
          //分页
          this.$api.get(
            "/api/SnPicture/GetFyTypeAllAsync?type=" +
              this.lbtype +
              "&pageIndex=" +
              this.page +
              "&pageSize=" +
              this.pagesize +
              "&isDesc=" +
              this.value
          )
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
.SnArticle {
  background-color: white;
  width: 75%;
  margin-left: 20%;
  position: relative;

  .SnArticle-1 {
    position: absolute;
    top: 75px;
    right: 110px;
    z-index: 1;
  }

  .SnArticle-2 {
    // background-color: #468847;
    margin: 3px 0 5px 0;
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
      // background-color: #42b983;
      font-size: 0.8125rem;
    }
  }
}
</style>
