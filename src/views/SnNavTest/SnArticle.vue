<template>
  <div class="SnArticle">
    <div class="SnArticle-1" align="right">
      <el-link type="primary" @click.native="add(1)">添加信息</el-link>
    </div>

    <!-- tab列表 -->
    <div class="SnArticle-2">
      <!-- 升序降序 -->
      <div class="SnArticle-switch">
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
          <el-table-column align="right">
            <template slot="header" slot-scope="scope">
              <el-input
                v-model="search"
                size="mini"
                placeholder="输入关键字搜索"
                @click="handleEdit(scope.$index, scope.row)"
              />
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

  data() {
    return {
      tableData: [],
      search: "",
      total: 0, //默认数据总数
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
    }, 200);
    this.GetArticleCount();
    this.SnArticle(1, this.value);
  },
  methods: {
    sx(value) {
      this.SnArticle(1, value);
      console.log(111111);
    },
    GetArticleCount() {
      request({
        url: "/api/SnArticle/GetArticleCount"
      })
        .then(res => {
          this.total = res.data;
          console.log(this.total);
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
      console.log(index, row.articleId);
    },
    handleDelete(index, row) {
      console.log(index, row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    SnArticle(pages, value) {
      request({
        // url: "/api/SnArticle/GetTest"
        url:
          "/api/SnArticle/GetfyTest?label=00&pageIndex=" +
          pages +
          "&pageSize=" +
          this.pagesize +
          "&isDesc=" +
          value
      })
        .then(res => {
          this.tableData = res.data;
          console.log(this.pagesize);
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },
    add() {
      this.$router.push("./Navform");
    }
  }
};
</script>

<style lang="scss" scoped>
.SnArticle {
  background-color: white;
  width: 75%;
  margin-left: 20%;

  .SnArticle-1 {
    // background-color: #42b983;
    padding-right: 40px;
  }

  .SnArticle-2 {
    position: relative;
    margin: 10px 0 10px 0;
    .SnArticle-switch {
      position: absolute;
      right: 120px;
      // background-color: #d3dce6;
      z-index: 1;
    }
  }
}
</style>
