<template>
  <div class="SnNavigation">
    <div class="SnNavigation-1" align="right">
      <el-link type="primary" @click.native="add(1)">添加信息</el-link>
    </div>
    <el-main>
      <el-table
        :data="
          tableData.filter(
            data =>
              !search || data.name.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100% "
      >
        <el-table-column label="navId" prop="navId"> </el-table-column>
        <el-table-column label="navTitle" prop="navTitle"> </el-table-column>
        <el-table-column label="navType" prop="navType"> </el-table-column>
        <el-table-column label="navUrl" prop="navUrl"> </el-table-column>
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
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
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

    <el-pagination background layout="prev, pager, next" :total="1000">
    </el-pagination>
  </div>
</template>

<script>
import request from "../../network/request.js";
export default {
  name: "SnNavigation",

  data() {
    return {
      tableData: [],
      search: ""
    };
  },

  created() {
    this.GetSnNavigation();
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
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

    GetSnNavigation() {
      request({
        url: "/api/SnNavigation/GetSnNavigation"
        // url: "/api/SnNavigation/GetfyNavigation?pageIndex=1&pageSize=2&isDesc=true"
        // url: "/api/SnNavigation/AsyGetWhereTest?type=收藏&fag=true"
      })
        .then(res => {
          this.tableData = res.data;
          console.log(this.tableData);
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
.SnNavigation {
  background-color: white;
  width: 75%;
  margin-left: 20%;
  .SnNavigation-1 {
    // background-color: #42b983;
    padding-right: 40px;
  }
}
</style>
