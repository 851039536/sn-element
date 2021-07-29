<template>
  <div>
    <!-- <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>-->
    <div class="Navform">
      <div class="Navform-1">
        <el-page-header @back="goBack" content="文章内容"></el-page-header>
      </div>
      <div class="Navform-2">
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-row>
            <el-col :span="24">
              <el-form-item label="分类名称">
                <el-input v-model="form.sortName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="分类别名">
                <el-input v-model="form.sortAlias"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="form.sortDescription"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="onSubmit()">Add</el-button>
                <el-button>取消</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </div>
  </div>
</template
>
<script>
  export default {
    data() {
      return {
        form: {
          sortId: 0,
          sortName: "",
          sortAlias: "",
          sortDescription: "",
          parentSortId: 0
        }
      };
    },
    methods: {
      // 添加数据
      onSubmit() {
        this.$api({
          // add
          url: "/api/SnSort/AddAsync",
          method: "post",
          data: {
            sortId: 0,
            sortName: this.form.sortName,
            sortAlias: this.form.sortAlias,
            sortDescription: this.form.sortDescription,
            parentSortId: 0
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$router.push("./SnArticle");
            } else {
              alert("添加失败");
            }
          })
          .catch(console.error.bind(console)); // 异常
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  };
</script>

<style lang="scss" scoped>
  .Navform {
    width: 78%;
    margin-left: 20%;
    @apply mt-2;
    background-color: white;

    .Navform-1 {
      // background-color: #468847;
      padding: 10px 0 20px 15px;
    }

    .Navform-2 {
      // background-color: #3a33d1;
      padding: 20px 10px 20px 10px;

      .editor-text {
        background-color: #42b983;
        width: 100%;
        height: 450px;
      }

      .editor-text-1 {
        background-color: #42b983;
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    }
  }
</style>
