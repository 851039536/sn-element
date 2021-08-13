<template>
  <div id="setBlog">
    <!-- <div class="setBlog_type">
      <el-link
        :underline="false"
        v-for="result in navTypeData"
        :key="result.id"
        @click="alltype(result.title)"
      >{{result.title}}</el-link>
    </div>-->
    <!-- 升序降序 -->
    <div class="setBlog-rank">
      排序
      <el-switch
        v-model="value"
        @click.native="rank(value)"
        active-color="#13ce66"
        inactive-color="#ff4949"
        active-value="true"
        inactive-value="false"
      >></el-switch>
    </div>
    <!-- tab列表 -->
    <div class="setBlog_tab">
      <el-main>
        <el-table
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
          <el-table-column label="id" prop="id"></el-table-column>
          <el-table-column label="setName" prop="setName"></el-table-column>
          <el-table-column label="setIsopen" prop="setIsopen"></el-table-column>
          <el-table-column label="setType" prop="setType"></el-table-column>
          <el-table-column align="right">
            <template slot="header">
              <el-link type="primary" @click.native="add(1)">添加信息</el-link>
            </template>
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
  import setBlog from "../../api/setBlog.js";
  export default {
    name: "SetBlog",
    components: {
    },
    inject: ["reload"],
    data() {
      return {
        tableData: [],
        navTypeData: [],
        search: "",
        total: 20, //默认数据总数
        page: 1, //当前页码
        pagesize: 7, //每页的数据条数
        navtype: "00", //默认所有
        fullscreenLoading: false,
        value: "true",

      };
    },

    created() {
      this.getall();
    },

    activated() {
      this.getall();
    },

    methods: {
      // 初始化加载
      getall() {

        //加载分类
        // navigation.GetNavTypeAllAsync().then(res => {
        //   this.navTypeData = res.data;
        // })
        //加载总数
        setBlog.GetCountAsync().then(res => {
          this.total = res.data;
        })
        //分页查询
        setBlog.GetFyAllAsync(this.navtype, this.page, this.pagesize, this.value).then(res => {
          this.tableData = res.data;
        })
      },
      //跳转
      rank(value) {
        this.GetSnNavigation(1, value);
      },
      handleEdit(index, row) {
        this.$router.push({
          path: "./SnNavigationUp",
          query: {
            id: row.navId
          }
        });
      },
      handleDelete(index, row) {
        this.$confirm("此操作将永久删除" + row.navTitle + ", 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
          .then(() => {

            setBlog.DeleteAsync(row.navId).then(res => {
              if (res.data === true) {
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
        setBlog.GetFyAllAsync(this.navtype, this.page, this.pagesize, this.value).then(res => {
          this.tableData = res.data;
        })
      },
      current_change(val) {
        this.page = val;
        this.GetSnNavigation();
      },
      add() {
        this.$router.push("./SnNavigationAdd");
      },
      alltype(name) {
        this.navtype = name;
        // alert(1);
        setBlog.CountTypeAsync(this.navtype).then(res => {
          this.total = res.data;
        })
        setBlog.GetFyAllAsync(this.navtype, this.page, this.pagesize, this.value).then(res => {
          this.tableData = res.data;
        })
        this.current_change(1);
      }
    }
  };
</script>

<style lang="scss" scoped>
  #setBlog {
    width: 78%;
    margin-left: 20%;
    @apply mt-2;
    position: relative;
    .setBlog-rank {
      position: absolute;
      top: 68px;
      right: 110px;
      z-index: 1;
    }

    .setBlog_tab {
      // @apply bg-gray-400;
    }
    .setBlog_type {
      @apply py-1;
      .el-link {
        @apply ml-4 p-1 bg-white rounded;
      }
    }
  }
</style>
