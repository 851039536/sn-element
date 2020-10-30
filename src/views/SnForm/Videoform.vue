<template>
  <div class="Navform">
    <div class="Navform-1">
      <el-page-header @back="goBack" content="添加视频内容"> </el-page-header>
    </div>
    <div class="Navform-2">
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-form-item label="标题名称">
          <el-input v-model="form.vTitle"></el-input>
        </el-form-item>
        <el-form-item label="收藏时间">
          <!-- <el-input type="text" v-model="form.vData"></el-input> -->

          <el-date-picker
            v-model="form.vData"
            type="datetime"
            placeholder="选择日期时间"
            default-time="12:00:00"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="图片链接">
          <el-input v-model="form.vImg"></el-input>

          <el-upload
            class="upload-demo"
            ref="upload"
            action="http://localhost:8081/img/"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"
            :auto-upload="false"
          >
            <el-button slot="trigger" size="small" type="primary"
              >选取文件</el-button
            >
            <el-button
              style="margin-left: 10px;"
              size="small"
              type="success"
              @click="submitUpload"
              >上传到服务器</el-button
            >
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="datavalue" filterable placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <!-- <el-input v-model="form.vTypeid"></el-input> -->
        </el-form-item>
        <el-form-item label="前往地址">
          <el-input v-model="form.vUrl"></el-input>
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
      fileList: []
    };
  },
  methods: {
    onSubmit() {
      this.$api({
        // 添加
        url: "/api/SnVideo/AsyInsVideo",
        method: "POST",
        data: {
          vTitle: this.form.vTitle,
          vData: this.form.vData,
          vImg: "http://oykperson.xyz/img/video/" + this.form.vImg,
          vTypeid: this.datavalue,
          vUrl: this.form.vUrl
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
