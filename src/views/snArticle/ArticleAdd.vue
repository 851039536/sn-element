<template>
  <div>
    <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>
    <div class="Navform">
      <div class="Navform-1">
        <el-page-header @back="goBack" content="文章内容"> </el-page-header>
      </div>
      <div class="Navform-2">
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="form.title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="内容简述">
                <el-input v-model="form.title_text"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="时间">
                <el-date-picker
                  v-model="form.time"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="标签">
                <!-- <el-input v-model="sortvalue"></el-input> -->

                <el-select v-model="sortvalue" filterable placeholder="请选择">
                  <el-option
                    v-for="item in sorttest"
                    :key="item.sortId"
                    :label="item.sortName"
                    :value="item.sortId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="分类">
                <el-select v-model="labelvalue" filterable placeholder="请选择">
                  <el-option
                    v-for="item in labeltest"
                    :key="item.labelId"
                    :label="item.labelName"
                    :value="item.labelId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类标题">
                <el-input v-model="form.type_title"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片路径">
                <el-input v-model="form.url_img"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片路径">
                <el-select
                  v-model="form.url_img"
                  filterable
                  placeholder="请选择"
                >
                  <el-option
                    v-for="item in imgtest"
                    :key="item.pictureId"
                    :label="item.pictureTitle"
                    :value="item.pictureUrl"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="内容">
                <!-- <el-input v-model="form.text"></el-input> -->
                <div class="editor-text">
                  <div class="editor-text-1">
                    <mavon-editor
                      v-model="form.text"
                      :subfield="true"
                      :boxShadow="false"
                      defaultOpen="preview"
                      :toolbarsFlag="true"
                    />
                  </div>
                </div>
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
  </div></template
>
<script>
export default {
  data() {
    return {
      form: {
        article_id: 0,
        user_id: 1,
        title: "",
        title_text: "",
        text: "",
        time: "",
        label_id: 0,
        read: 0,
        give: 0,
        comment: "0",
        sort_id: 0,
        type_title: "string",
        url_img: "请选择",
        time2: ""
      },
      newarticle: [],
      labelvalue: "",
      labeltest: [],
      sortvalue: "",
      sorttest: [],
      imgtest: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        },
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  created() {
    this.getall();
  },
  methods: {
    // 加载分类 标签
    getall() {
      this.$api({
        url: "/api/SnLabels/GetAllAsync"
      }).then(res => {
        this.labeltest = res.data;
      });

      this.$api({
        url: "/api/SnSort/GetAllAsync"
      }).then(res => {
        this.sorttest = res.data;
      });

      // 加载图床
      this.$api({
        url:
          "/api/SnPicture/GetFyTypeAllAsync?type=1&pageIndex=1&pageSize=100&isDesc=true"
      }).then(res => {
        this.imgtest = res.data;
      });
    },
    timedate() {
      this.form.time2 =
        this.form.time.getFullYear() +
        "-" +
        (this.form.time.getMonth() + 1) +
        "-" +
        this.form.time.getDate() +
        " " +
        this.form.time.getHours() +
        ":" +
        this.form.time.getMinutes() +
        ":" +
        this.form.time.getSeconds();
    },
    // 添加数据
    onSubmit() {
      this.timedate();
      this.$api({
        url: "/api/SnArticle/AddAsync",
        method: "post",
        data: {
          article_id: 0,
          user_id: 1,
          title: this.form.title,
          title_text: this.form.title_text,
          text: this.form.text,
          time: this.form.time2,
          label_id: Number(this.sortvalue),
          read: 0,
          give: 0,
          comment: "0",
          sort_id: Number(this.sortvalue),
          type_title: this.form.type_title,
          url_img: this.form.url_img
        }
      }).then(res => {
        if (res.status === 200) {
          this.$message({
            type: "success",
            message: "添加成功!"
          });
          this.$router.push("./SnArticle");
        } else {
          alert("添加失败");
        }
      });
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
