<template>
  <div id="snArticle">
    <el-tabs type="border-card">
      <el-tab-pane label="文章管理">
        <div class="SnArticle_main">
          <div class="SnArticle_main_content" v-for="info in LabelsData" :key="info.labelId">
            <el-link :underline="false" @click="alltype(info.labelId)">
              {{
              info.labelName
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
        <div class="SnArticle-2">
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
              style="width: 100% "
            >
              <el-table-column label="articleId" prop="articleId"></el-table-column>
              <el-table-column label="time" prop="time"></el-table-column>
              <el-table-column label="title" prop="title"></el-table-column>

              <el-table-column align="right">
                <template slot="header">
                  <el-link type="primary" @click.native="add(1)">添加</el-link>
                </template>
                <template slot-scope="scope">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
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
      <el-tab-pane label="标签管理">
        <SnLabels></SnLabels>
      </el-tab-pane>
      <el-tab-pane label="分类管理">
        <SnSort></SnSort>
      </el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import SnLabels from "../SnLabels/SnLabels.vue";
  import SnSort from "../snSort/SnSort.vue";
  import article from "../../api/article.js";
  import labels from "../../api/labels.js";
  export default {
    name: "Article",
    components: {
      SnLabels,
      SnSort
    },
    inject: ["reload"],
    data() {
      return {
        tableData: [],
        search: "",
        total: 0, //默认数据总数
        page: 1, //当前页码
        pagesize: 7, //每页的数据条数
        fullscreenLoading: false,
        lbtype: "00",
        value: "true",
        LabelsData: []
      };
    },

    created() {
      this.GetAll();
    },
    activated() {
      this.GetAll();
    },
    methods: {
      sx(value) {
        this.SnArticle(1, value);
      },

      // 初始化加载
      GetAll() {
        //查询总数
        article.GetCountAsync().then(res => {
          this.total = res.data;
        });
        //分页查询
        article
          .GetFyTitleAsync(this.page, this.pagesize, this.value, false)
          .then(res => {
            this.tableData = res.data;
          });
        //查询标签
        labels.GetAllAsync().then(res => {
          this.LabelsData = res.data;
        });
      },

      current_change(val) {
        this.page = val;
        this.SnArticle();
      },
      handleEdit(index, row) {
        // .带参数跳转
        this.$router.push({
          path: "./ArticleUp",
          query: {
            id: row.articleId
          }
        });
      },
      handleDelete(index, row) {
        this.$confirm("此操作将永久删除" + row.title + ", 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          article
            .DeleteAsync(row.articleId)
            .then(res => {
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
              this.reload();
              // location.reload();
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        });
      },

      SnArticle() {
        //按标签条件分页查询
        article
          .GetfyTestAsync(
            this.lbtype,
            this.page,
            this.pagesize,
            this.value,
            false
          )
          .then(res => {
            this.tableData = res.data;
          });
        //查询标签
        labels.GetAllAsync().then(res => {
          this.LabelsData = res.data;
        });
      },
      add() {
        this.$router.push("./ArticleAdd");
      },
      alltype(typeid) {
        this.lbtype = typeid;
        console.log(this.lbtype);

        article.GetTypeCountAsync(this.lbtype).then(res => {
          this.total = res.data;
        });
        article
          .GetfyTestAsync(
            this.lbtype,
            this.page,
            this.pagesize,
            this.value,
            false
          )
          .then(res => {
            this.tableData = res.data;
          });
        this.current_change(1);
      }
    }
  };
</script>

<style lang="scss" scoped>
  @import "./scss/Article.scss";
</style>
