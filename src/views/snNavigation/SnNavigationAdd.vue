<template>
  <div id="navform_add">
    <div class="Navform-1">
      <el-page-header @back="goBack" content="添加导航内容"></el-page-header>
    </div>
    <div class="Navform-2">
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="标题名称">
          <el-input v-model="form.navTitle"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.navText"></el-input>
        </el-form-item>
        <el-form-item label="图片链接">
          <el-input v-model="form.navImg"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="form.navType" placeholder="请选择">
            <el-option
              :label="result.title"
              :value="result.title"
              v-for="result in navTypeData"
              :key="result.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="前往地址">
          <el-input v-model="form.navUrl"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">立即创建</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template
>
<script>
  import navigation from "../../api/navigation.js";
  export default {
    data() {
      return {
        form: {
          navTitle: "",
          navText: "",
          navImg: "",
          navType: "",
          navUrl: ""
        },
        navTypeData: []
      };
    },


    created() {
      this.getNavType();
    },
    methods: {
      getNavType() {
        navigation.GetNavTypeAllAsync().then(res => {
          this.navTypeData = res.data;
        })
      },
      onSubmit() {
        this.$api({
          // 添加
          url: "/api/SnNavigation/AddAsync",
          method: "POST",
          data: {
            navId: 0,
            navTitle: this.form.navTitle,
            navText: this.form.navText,
            navImg: this.form.navImg,
            navType: this.form.navType,
            navUrl: this.form.navUrl
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$router.push("./SnNavigation");
            } else {
              console.log("失败");
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
  #navform_add {
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
    }
  }
</style>
