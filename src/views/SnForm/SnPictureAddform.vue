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
              <el-form-item label="图片链接">
                <el-input v-model="form.pictureUrl"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="描述">
                <el-input v-model="form.pictureTitle"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="图片分类">
                <el-select v-model="form.pictureTypeId" filterable placeholder="请选择">
                  <el-option
                    v-for="item in labeltest"
                    :key="item.id"
                    :label="item.pictureTypeName"
                    :value="item.pictureTypeId"
                  ></el-option>
                </el-select>
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
          pictureId: 0,
          pictureUrl: "",
          pictureTitle: "",
          pictureTypeId: "请选择"
        },
        labeltest: []
      };
    },
    created() {
      this.getall();
    },
    methods: {
      getall() {
        this.$api({
          url: "/api/SnPictureType/GetAllAsync"
        })
          .then(res => {
            this.labeltest = res.data;
          })
          .catch(e => {
            console.log(e + "获取数据失败");
          });
      },
      // 添加数据
      onSubmit() {
        this.$api({
          // add
          url: "/api/SnPicture/AddAsync",
          method: "post",
          data: {
            pictureId: 0,
            pictureUrl: this.form.pictureUrl,
            pictureTitle: this.form.pictureTitle,
            pictureTypeId: Number(this.form.pictureTypeId)
          }
        })
          .then(res => {
            if (res.data === true) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$router.push("./SnPicture");
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
