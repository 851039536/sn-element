<template>
  <div>
    <!-- <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>-->
    <div class="Navform">
      <div class="Navform-1">
        <el-page-header @back="goBack" content="添加视频内容"></el-page-header>
      </div>
      <div class="Navform-2">
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item label="标题名称">
                <el-input v-model="form.vTitle"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="收藏时间">
                <!-- <el-input type="text" v-model="form.vData"></el-input> -->

                <el-date-picker
                  v-model="form.vData"
                  type="datetime"
                  placeholder="选择日期时间"
                  default-time="12:00:00"
                ></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片链接">
                <el-input v-model="form.vImg"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="图片链接">
                <el-select v-model="form.vImg" filterable placeholder="请选择">
                  <el-option
                    v-for="item in imgtest"
                    :key="item.pictureId"
                    :label="item.pictureTitle"
                    :value="item.pictureUrl"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类">
                <el-select v-model="datavalue" filterable placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
                <!-- <el-input v-model="form.vTypeid"></el-input> -->
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="前往地址">
                <el-input v-model="form.vUrl"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="onSubmit">立即创建</el-button>
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
          vTitle: "",
          vData: "",
          vImg: "",
          vUrl: "",
          delivery: false,
          type: [],
          resource: "",
          desc: ""
        },
        options: [
          {
            value: 1,
            label: "火影"
          },
          {
            value: 2,
            label: "lol"
          }
        ],
        datavalue: "",
        fileList: [],
        imgtest: []
      };
    },
    created() {
      this.getall();
    },

    methods: {
      getall() {
        // 加载图床
        this.$api({
          url:
            "/api/SnPicture/GetFyTypeAllAsync?type=3&pageIndex=1&pageSize=100&isDesc=true"
        })
          .then(res => {
            this.imgtest = res.data;
          })
          .catch(e => {
            console.log(e + "获取数据失败");
          });
      },
      onSubmit() {
        this.$api({
          // 添加
          url: "/api/SnVideo/AsyInsVideo",
          method: "POST",
          data: {
            vTitle: this.form.vTitle,
            vData: this.form.vData,
            vImg: this.form.vImg,
            vTypeid: this.datavalue,
            vUrl: this.form.vUrl
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.$message({
                type: "success",
                message: "添加成功!"
              });
            } else {
              console.log("失败");
              alert("添加失败");
            }
          })
          .catch(console.error.bind(console)); // 异常
      },
      goBack() {
        this.$router.go(-1);
      },

      // 上传
      submitUpload() {
        this.$refs.upload.submit();
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file);
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
    }
  }
</style>
