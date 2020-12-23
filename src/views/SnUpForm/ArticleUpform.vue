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
            <el-col :span="10">
              <el-form-item label="内容简述">
                <el-input v-model="form.titleText"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发表人">
                <el-input v-model="form.userId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
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
            <el-col :span="4">
              <el-form-item label="阅读">
                <el-input v-model="form.read"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="点赞">
                <el-input v-model="form.give"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="评论">
                <el-input v-model="form.comment"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="分类">
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
            <el-col :span="4">
              <el-form-item label="分类标题">
                <el-input v-model="form.typeTitle"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="标签">
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
              <el-form-item label="图片路径">
                <el-input v-model="form.urlImg"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片路径">
                <el-select
                  v-model="form.urlImg"
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
                <el-button type="primary" @click="onSubmit()">更新</el-button>
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
        articleId: 0,
        userId: 0,
        title: "",
        titleText: "",
        text: "",
        time: "",
        labelId: 0,
        read: 0,
        give: 0,
        comment: "",
        sortId: 0,
        typeTitle: "string",
        urlImg: "img"
      },
      id: this.$route.query.id,
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
    this.getall(this.id);
  },
  methods: {
    // 窗体赋值
    getall(id) {
      this.$api({
        url: "/api/SnArticle/AsyGetTestID?id=" + id
      })
        .then(res => {
          this.newarticle = res.data;
          this.form.articleId = id;
          this.form.userId = this.newarticle.userId;
          this.form.title = this.newarticle.title;
          this.form.titleText = this.newarticle.titleText;
          this.form.text = this.newarticle.text;
          this.form.time = this.newarticle.time;
          this.form.read = this.newarticle.read;
          this.labelvalue = this.newarticle.labelId;
          this.form.give = this.newarticle.give;
          this.form.comment = this.newarticle.comment;
          this.sortvalue = this.newarticle.sortId;
          this.form.typeTitle = this.newarticle.typeTitle;
          this.form.urlImg = this.newarticle.urlImg;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });

      // 加载分类
      this.$api({
        url: "/api/SnLabels/GetLabels"
      })
        .then(res => {
          this.labeltest = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
      // 加载标签
      this.$api({
        url: "/api/SnSort/GetSort"
      })
        .then(res => {
          this.sorttest = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });

      // 加载图床
      this.$api({
        url:
          "/api/SnPicture/GetFyTypeAllAsync?type=1&pageIndex=1&pageSize=100&isDesc=true"
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
        url: "/api/SnArticle/AysUpArticle",
        method: "put",
        data: {
          articleId: this.newarticle.articleId,
          userId: Number(this.form.userId),
          title: this.form.title,
          titleText: this.form.titleText,
          text: this.form.text,
          time: this.form.time,
          labelId: this.labelvalue,
          read: Number(this.form.read),
          give: Number(this.form.give),
          comment: this.form.comment,
          sortId: this.sortvalue,
          typeTitle: this.form.typeTitle,
          urlImg: this.form.urlImg
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.$notify({
              title: "更新成功",
              message: res.statuss,
              type: "success"
            });
            this.$router.push("./SnArticle");
          } else {
            this.$notify.error({
              title: "更新错误",
              message: "更新错误s"
            });
          }
        })
        .catch(console.error.bind(console)); // 异常
    },

    // 后退s
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
