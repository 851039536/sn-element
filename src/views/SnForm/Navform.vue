<template>
  <div class="Navform">
    <div class="Navform-1">
      <el-page-header @back="goBack" content="添加导航内容"> </el-page-header>
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
            <el-option label="收藏" value="收藏"></el-option>
            <el-option label="网站" value="网站"></el-option>
            <el-option label="博客圈" value="博客圈"></el-option>
            <el-option label="VUE" value="VUE"></el-option>
            <el-option label="CSS" value="CSS"></el-option>
            <el-option label="NET" value="NET"></el-option>
            <el-option label="javascript" value="javascript"></el-option>
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
</template>
<script>
export default {
  data() {
    return {
      form: {
        navTitle: "",
        navText: "",
        navImg: "",
        navType: "",
        navUrl: ""
      }
    };
  },
  methods: {
    onSubmit() {
      this.$api({
        // 添加
        url: "/api/SnNavigation/AsyIntNavigation",
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
            console.log("成功");
            alert("添加成功");
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
.Navform {
  width: 75%;
  margin-left: 19%;
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
