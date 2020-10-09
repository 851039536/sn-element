<template>
  <div class="SnNavigation">
    <div class="SnNavigation-1" align="right">
      <el-link type="primary" @click.native="add(1)">添加信息</el-link>
    </div>

    <!-- tab列表 -->
    <div class="SnNavigation-2">
      <!-- 升序降序 -->
      <div class="SnNavigation-switch">
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
          <el-table-column label="navId" prop="navId"> </el-table-column>
          <el-table-column label="navTitle" prop="navTitle"> </el-table-column>
          <el-table-column label="navType" prop="navType"> </el-table-column>
          <el-table-column label="navUrl" prop="navUrl"> </el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-select
                v-model="value1"
                placeholder="请选择"
                value-key="id"
                @change="getselect($event)"
              >
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
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

  data() {
    return {
      tableData: [],
      search: "",
      total: 20, //默认数据总数
      page: 1, //当前页码
      pagesize: 8, //每页的数据条数
      navtype: "all", //默认所有
      fullscreenLoading: false,
      value: "true",
      options: [
        {
          id: "1",
          value: "1",
          label: "VUE"
        },
        {
          id: "2",
          value: "2",
          label: "CSS"
        },
        {
          id: "3",
          value: "3",
          label: "NET"
        },
        { id: "4", value: "4", label: "CE" },
        { id: "5", value: "5", label: "SC" }
      ],
      value1: ""
    };
  },

  created() {
    this.fullscreenLoading = true;
    setTimeout(() => {
      this.fullscreenLoading = false;
    }, 300);
    this.GetNavigationCount();
    this.GetSnNavigation(1, this.value);
  },
  methods: {
    getselect($event) {
      console.log($event);
    },
    sx(value) {
      this.GetSnNavigation(1, value);
      console.log(111111);
    },
    GetNavigationCount() {
      request({
        url: "/api/SnNavigation/GetNavigationCount"
      })
        .then(res => {
          this.total = res.data;
          console.log(this.total);
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

    GetSnNavigation(pages, value) {
      request({
        // url: "/api/SnNavigation/GetSnNavigation"
        url:
          "/api/SnNavigation/GetfyNavigation?type=" +
          this.navtype +
          "&pageIndex=" +
          pages +
          "&pageSize=" +
          this.pagesize +
          "&isDesc=" +
          value
      })
        .then(res => {
          this.tableData = res.data;
          console.log(this.tableData);
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
    }
  }
};
</script>

<style lang="scss" scoped>
.SnNavigation {
  background-color: white;
  width: 75%;
  margin-left: 20%;

  .SnNavigation-1 {
    // background-color: #42b983;
    padding-right: 40px;
  }

  .SnNavigation-2 {
    position: relative;
    margin: 10px 0 10px 0;

    .SnNavigation-switch {
      position: absolute;
      right: 120px;
      // background-color: #d3dce6;
      z-index: 1;
    }
  }
}
</style>
