<template>
  <div>
    <!-- <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>-->
    <div class="Navform">
      <div class="Navform-1">
        <el-page-header @back="goBack" content="更新视频内容"></el-page-header>
      </div>
      <div class="Navform-2">
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-row>
            <el-form-item label="标题名称">
              <el-input v-model="form.vTitle"></el-input>
            </el-form-item>
            <el-form-item label="图片链接">
              <el-input v-model="form.vImg"></el-input>
            </el-form-item>

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

            <el-form-item label="分类">
              <el-select v-model="datavalue" filterable placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.vId"
                  :label="item.vType"
                  :value="item.vId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="前往地址">
              <el-input v-model="form.vUrl"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="onSubmit()">更新</el-button>
              <el-button>取消</el-button>
            </el-form-item>
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
          vTitle: "",
          vData: "",
          vImg: "",
          vTypeid: "",
          vUrl: "",
          vId: 0
        },
        id: this.$route.query.id,
        newvideo: [],
        options: [],
        imgtest: [],
        datavalue: ""
      };
    },
    created() {
      this.getall(this.id);
    },
    methods: {
      getall(id) {
        // 窗体赋值
        this.$api({
          url: "/api/SnVideo/AsyGetTestId?id=" + id
        })
          .then(res => {
            this.newvideo = res.data[0];
            this.form.vId = id;
            this.form.vTitle = this.newvideo.vTitle;
            this.form.vData = this.newvideo.vData;
            this.form.vImg = this.newvideo.vImg;
            this.datavalue = this.newvideo.vTypeid;
            this.form.vUrl = this.newvideo.vUrl;
          })
          .catch(e => {
            console.log(e + "获取数据失败");
          });

        // 加载video分类表
        this.$api({
          url: "/api/SnVideoType/AsyGestTest"
        })
          .then(res => {
            this.options = res.data;
          })
          .catch(e => {
            console.log(e + "获取数据失败");
          });

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
          // 更新
          url: "/api/SnVideo/AysUpVideo",
          method: "put",
          data: {
            vId: this.newvideo.vId,
            vTitle: this.form.vTitle,
            vData: this.form.vData,
            vImg: this.form.vImg,
            vTypeid: this.datavalue,
            vUrl: this.form.vUrl
          }
        })
          .then(res => {
            if (res.status === 200) {
              this.$notify({
                title: "更新成功",
                message: res.statuss,
                type: "success"
              });
              this.$router.push("./SnVideo");
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
