<template>
  <div>
    <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>
    <div class="Navform">
      <div class="Navform-1">
        <el-page-header @back="goBack" content="更新内容"> </el-page-header>
      </div>
      <div class="Navform-2">
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="form.oneTitle"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="图片">
                <el-input v-model="form.oneImg"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发表人">
                <el-input v-model="form.oneAuthor"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间">
                <el-date-picker
                  v-model="form.oneData"
                  align="right"
                  type="date"
                  placeholder="选择日期"
                  :picker-options="pickerOptions"
                >
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="分类">
                <el-select v-model="labelvalue" filterable placeholder="请选择">
                  <el-option
                    v-for="item in labeltest"
                    :key="item.soTypeId"
                    :label="item.soTypeTitle"
                    :value="item.soTypeId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="内容">
                <div class="editor-text">
                  <div class="editor-text-1">
                    <mavon-editor
                      v-model="form.oneText"
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
  </div>
</template>
<script>
export default {
  name: "OneUp",
  data() {
    return {
      form: {
        oneId: 0,
        oneTitle: "",
        oneText: "",
        oneImg: "",
        oneTypeId: 0,
        oneAuthor: "",
        oneData: "",
        oneRead: 0,
        oneGive: 0,
        oneComment: 0
      },
      id: this.$route.query.id,
      labelvalue: "",
      labeltest: [],
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
    // 加载分类 标签
    getall(id) {
      this.$api({
        url: "/api/SnOneType/GetAll"
      })
        .then(res => {
          this.labeltest = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });

      this.$api({
        url: "/api/SnOne/GetOneIdAsync?id=" + id
      })
        .then(res => {
          this.newtext = res.data;
          this.form.oneId = id;
          this.form.oneTitle = this.newtext.oneTitle;
          this.form.oneText = this.newtext.oneText;
          this.form.oneImg = this.newtext.oneImg;
          this.labelvalue = this.newtext.oneTypeId;
          this.form.oneAuthor = this.newtext.oneAuthor;
          this.form.oneData = this.newtext.oneData;
          this.form.oneRead = this.newtext.oneRead;
          this.form.oneGive = this.newtext.oneGive;
          this.oneComment = this.newtext.oneComment;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },
    onSubmit() {
      this.$api({
        // put
        url: "/api/SnOne/AysUpOne",
        method: "put",
        data: {
          oneId: this.newtext.oneId,
          oneTitle: this.form.oneTitle,
          oneText: this.form.oneText,
          oneImg: this.form.oneImg,
          oneTypeId: Number(this.labelvalue),
          oneAuthor: this.form.oneAuthor,
          oneData: this.form.oneData,
          oneRead: 0,
          oneGive: 0,
          oneComment: 0
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "更新成功!"
            });
            this.$router.push("./SnOne");
          } else {
            alert("更新失败");
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
