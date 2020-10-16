<template>
  <div class="SnNavigation">
    <div class="SnNavigation-3">
      <el-link :underline="false" @click="alltype('收藏')">收藏</el-link>
      <el-link :underline="false" @click="alltype('网站')">网站</el-link>
      <el-link :underline="false" @click="alltype('博客圈')">博客圈</el-link>
      <el-link :underline="false" @click="alltype('VUE')">VUE</el-link>
      <el-link :underline="false" @click="alltype('CSS')">CSS</el-link>
      <el-link :underline="false" @click="alltype('NET')">NET</el-link>
      <el-link :underline="false" @click="alltype('javascript')"
        >javascript</el-link
      >
    </div>
    <!-- 升序降序 -->
    <div class="SnNavigation-1">
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
          <el-table-column label="navId" prop="navId"> </el-table-column>
          <el-table-column label="navTitle" prop="navTitle"> </el-table-column>
          <el-table-column label="navType" prop="navType"> </el-table-column>
          <el-table-column label="navUrl" prop="navUrl"> </el-table-column>
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
  name: "SnNavigation",
  inject: ["reload"],
  data() {
    return {
      tableData: [],
      search: "",
      total: 20, //默认数据总数
      page: 1, //当前页码
      pagesize: 8, //每页的数据条数
      navtype: "all", //默认所有
      fullscreenLoading: false,
      value: "true"
    };
  },

  created() {
    this.fullscreenLoading = true;
    setTimeout(() => {
      this.fullscreenLoading = false;
    }, 300);
    this.GetNavigationCount();
    this.GetSnNavigation();
  },
  methods: {
    sx(value) {
      this.GetSnNavigation(1, value);
    },
    GetNavigationCount() {
      request({
        url: "/api/SnNavigation/GetNavigationCount"
      })
        .then(res => {
          this.total = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },
    handleEdit(index, row) {
      console.log(index, row.navId, 111111);

      // .带参数跳转
      this.$router.push({
        path: "./Navigationform",
        query: {
          id: row.navId
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
          request({
            url: "/api/SnNavigation/AsyDelNavigation?id=" + row.navId,
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
    //分页查询
    GetSnNavigation() {
      request({
        url:
          "/api/SnNavigation/GetfyNavigation?type=" +
          this.navtype +
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
    },
    current_change(val) {
      this.page = val;
      this.GetSnNavigation(this.page, this.value);
    },
    add() {
      this.$router.push("./Navform");
    },
    alltype(name) {
      this.navtype = name;

      request({
        url: "/api/SnNavigation/GetNavigationCountType?type=" + this.navtype
      })
        .then(res => {
          this.total = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });

      request({
        url:
          "/api/SnNavigation/GetfyNavigation?type=" +
          this.navtype +
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
  .SnNavigation-1 {
    position: absolute;
    top: 73px;
    right: 110px;
    z-index: 1;
  }

  .SnNavigation-2 {
    margin: 10px 0 10px 0;
  }
  .SnNavigation-3 {
    .el-link {
      margin-left: 10px;
      padding: 5px;
    }
  }
}
</style>
