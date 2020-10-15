<template>
  <div class="SnArticle">
    <div class="SnArticle-3">
      <div class="SnArticle-3-1" v-for="info in LabelsData" :key="info.labelId">
        <el-link :underline="false" @click="alltype(info.labelId)">{{
          info.labelName
        }}</el-link>
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
          style="width: 100% "
        >
          <el-table-column label="articleId" prop="articleId">
          </el-table-column>
          <el-table-column label="time" prop="time"> </el-table-column>
          <el-table-column label="title" prop="title"> </el-table-column>
          <el-table-column label="labelId" prop="labelId"> </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-link type="primary" @click.native="add(1)">添加信息</el-link>
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
  </div>
</template>

<script>
import request from "../../network/request.js";
export default {
  name: "SnArticle",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      search: "",
      total: 0, //默认数据总数
      page: 1, //当前页码
      pagesize: 8, //每页的数据条数
      fullscreenLoading: false,
      lbtype: "",
      value: "true",
      LabelsData: []
    };
  },

  created() {
    this.fullscreenLoading = true;
    setTimeout(() => {
      this.fullscreenLoading = false;
    }, 200);
    this.GetArticleCount();
    this.SnArticle();
  },
  methods: {
    sx(value) {
      this.SnArticle(1, value);
    },
    GetArticleCount() {
      request({
        url: "/api/SnArticle/GetArticleCount"
      })
        .then(res => {
          this.total = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },
    current_change(val) {
      this.page = val;
      this.SnArticle(this.page, this.value);
    },
    handleEdit(index, row) {
      // .带参数跳转
      this.$router.push({
        path: "./ArticleUpform",
        query: {
          id: row.articleId
        }
      });
    },
    handleDelete(index, row) {
      alert(row.articleId);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: "/api/SnArticle/AsyDetArticleId?id=" + row.articleId,
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

    SnArticle() {
      request({
        url:
          "/api/SnArticle/GetfyTest?label=00&pageIndex=" +
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
      request({
        url: "/api/SnLabels/GetLabels"
      })
        .then(res => {
          this.LabelsData = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },
    add() {
      this.$router.push("./ArticleAddform");
    },
    alltype(typeid) {
      this.lbtype = typeid;

      request({
        url:
          "/api/SnArticle/GetfyTest?label=" +
          this.lbtype +
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
    top: 102px;
    right: 110px;
    z-index: 1;
  }

  .SnArticle-2 {
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
  }
}
</style>
