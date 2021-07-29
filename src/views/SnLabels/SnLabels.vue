<template>
  <div>
    <div class="SnNavigation">
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
            style="width: 100% "
          >
            <el-table-column label="主键" prop="labelId"></el-table-column>
            <el-table-column label="标签名" prop="labelName"></el-table-column>
            <el-table-column label="标签别名" prop="labelAlias"></el-table-column>
            <!--  <el-table-column label="标签描述" prop="labelDescription">
            </el-table-column>-->
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
  import labels from "../../api/labels.js";
  export default {
    name: "SnLabelsS",
    inject: ["reload"],
    data() {
      return {
        tableData: [],
        search: "",
        total: 20, //默认数据总数
        page: 1, //当前页码
        pagesize: 8, //每页的数据条数
        fullscreenLoading: false,
        value: "true"
      };
    },

    created() {

      this.fullscreenLoading = true;
      setTimeout(() => {
        this.fullscreenLoading = false;
      }, 300);
      this.getall();
    },
    methods: {
      // 初始化加载
      getall() {
        labels.GetCountAsync().then(res => {
          this.total = res.data;
        });
        labels.GetfyAllAsync(this.page, this.pagesize, this.value).then(res => {
          this.tableData = res.data;
        });
      },

      sx(value) {
        this.GetPaging(1, value);
      },

      handleEdit(index, row) {
        // .带参数跳转
        this.$router.push({
          path: "./SnLabelsUp",
          query: {
            id: row.labelId
          }
        });
        // this.$router.push("./Navigationform");
      },
      handleDelete(index, row) {
        this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {
            this.$api({
              url: "/api/SnLabels/DeleteAsync?id=" + row.labelId,
              method: "delete"
            })
              .then(res => {
                console.log(res.data);
                if (res.data === true) {
                  this.$message({
                    type: "success",
                    message: "删除成功!"
                  });

                } else {
                  this.$message({
                    type: "info",
                    message: "删除失败"
                  });
                }
                this.reload();
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

      GetPaging() {
        labels.GetfyAllAsync(this.page, this.pagesize, this.value).then(res => {
          this.tableData = res.data;
        });
      },
      current_change(val) {
        this.page = val;
        this.GetPaging();
      },
      add() {
        this.$router.push("./SnLabelsAdd");
      }
    }
  };
</script>

<style lang="scss" scoped>
  .SnNavigation {
    position: relative;

    .SnArticle-1 {
      position: absolute;
      top: 30px;
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
