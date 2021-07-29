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
              <el-form-item label="标签名称">
                <el-input v-model="form.labelName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="标签别名">
                <el-input v-model="form.labelAlias"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="标签描述">
                <el-input v-model="form.labelDescription"></el-input>
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
</template>
<script>
  export default {
    data() {
      return {
        form: {
          labelId: 0,
          labelName: "",
          labelAlias: "",
          labelDescription: ""
        }
      };
    },
    methods: {
      // 添加数据
      onSubmit() {
        this.$api({
          url: "/api/SnLabels/AddAsync",
          method: "post",
          data: {
            labelId: 0,
            labelName: this.form.labelName,
            labelAlias: this.form.labelAlias,
            labelDescription: this.form.labelDescription
          }
        })
          .then(res => {
            if (res.data === true) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              // this.$router.push("./SnArticle");
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
