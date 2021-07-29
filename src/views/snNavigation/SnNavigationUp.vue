<template>
  <div id="navformUp">
    <div class="Navform-1">
      <el-page-header @back="goBack" content="更新导航内容"></el-page-header>
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
          <el-button type="primary" @click="onSubmit()">更新</el-button>
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
          navUrl: "",
          navId: 0
        },
        id: this.$route.query.id,
        navigtion: [],
        navTypeData: []
      };
    },

    created() {
      this.getall(this.id);
      this.getNavType();
    },
    methods: {

      getNavType() {
        navigation.GetNavTypeAllAsync().then(res => {
          this.navTypeData = res.data;
        })
      },
      getall(id) {
        this.$api({
          url: "/api/SnNavigation/GetByIdAsync?id=" + id
        })
          .then(res => {
            this.navigtion = res.data;
            this.form.navId = id;
            this.form.navTitle = this.navigtion.navTitle;
            this.form.navText = this.navigtion.navText;
            this.form.navImg = this.navigtion.navImg;
            this.form.navType = this.navigtion.navType;
            this.form.navUrl = this.navigtion.navUrl;
          })
          .catch(e => {
            console.log(e + "获取数据失败");
          });
      },

      onSubmit() {
        this.$api({
          // 更新
          url: "/api/SnNavigation/UpdateAsync",
          method: "put",
          contentType: "application/json;charset=UTF-8",
          data: {
            navId: this.navigtion.navId,
            navTitle: this.form.navTitle,
            navText: this.form.navText,
            navImg: this.form.navImg,
            navType: this.form.navType,
            navUrl: this.form.navUrl
          },
          dataType: "json"
        })
          .then(res => {
            if (res.status === 200) {
              this.$notify({
                title: "更新成功",
                message: res.statuss,
                type: "success"
              });
              this.$router.push("./SnNavigation");


            } else {
              this.$notify.error({
                title: "更新错误",
                message: "更新错误"
              });
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
  #navformUp {
    width: 78%;
    margin-left: 20%;
    @apply mt-2;
    background-color: white;
    .Navform-1 {
      padding: 10px 0 20px 15px;
    }
    .Navform-2 {
      @apply p-2;
    }
  }
</style>
