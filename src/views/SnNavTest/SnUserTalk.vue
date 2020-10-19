<template>
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
      >
        >
      </el-switch>
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
          style="width: 100% "
        >
          <el-table-column label="id" prop="id"> </el-table-column>
          <el-table-column label="userId" prop="userId"> </el-table-column>
          <el-table-column label="talkTime" prop="talkTime"> </el-table-column>
          <el-table-column label="talkText" prop="talkText"> </el-table-column>
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
    this.GetTalkCount();
    this.GetPagingUser();
  },
  methods: {
    sx(value) {
      this.GetPagingUser(1, value);
    },
    GetTalkCount() {
      request({
        url: "/api/SnUserTalk/GetTalkCount"
      })
        .then(res => {
          this.total = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },
    handleEdit(index, row) {
      console.log(index, row.id, 111111);

      // .带参数跳转
      this.$router.push({
        path: "./UserTalkUpform",
        query: {
          id: row.id
        }
      });
      // this.$router.push("./Navigationform");
    },
    handleDelete(index, row) {
      console.log(index, row.id);

      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          request({
            url: "/api/SnUserTalk/AsyDetUserTalk?id=" + row.id,
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

    GetPagingUser() {
      request({
        url:
          "/api/SnUserTalk/GetPagingUserTalk?&pageIndex=" +
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
    },
    current_change(val) {
      this.page = val;
      this.GetPagingUser(this.page, this.value);
    },
    add() {
      this.$router.push("./UserTalkAddform");
    },
    alltype(typeid) {
      this.vtype = typeid;

      request({
        url: "/api/SnVideo/GetVideoCountType?type=" + this.vtype
      })
        .then(res => {
          this.total = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });

      request({
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
    }
  }
};
</script>

<style lang="scss" scoped>
.SnNavigation {
  background-color: white;
  width: 75%;
  margin-left: 20%;
  position: relative;
  .SnArticle-1 {
    position: absolute;
    top: 34px;
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
  }
}
</style>
