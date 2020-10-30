<template>
  <div class="Navform">
    <div class="Navform-1">
      <el-page-header @back="goBack" content="添加用户"> </el-page-header>
    </div>
    <div class="Navform-2">
      <el-form ref="form" :model="form" label-width="80px" size="small">
        <el-row>
          <el-col :span="12">
            <el-form-item label="userId">
              <el-input v-model="form.userId"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="说说内容">
              <el-input v-model="form.talkText"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="发表时间">
              <el-date-picker
                v-model="form.talkTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="阅读">
              <el-input v-model="form.talkRead"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="点赞">
              <el-input v-model="form.talkGive"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="评论">
              <el-input v-model="form.commentId"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item>
              <el-button type="primary" @click="onSubmit()">Up</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        id: 0,
        userId: 0,
        talkText: "",
        talkTime: "",
        talkRead: 0,
        talkGive: 0,
        commentId: 0
      },
      newtext: [],
      id: this.$route.query.id,
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
    getall() {
      // 窗体赋值
      this.$api({
        url: "/api/SnUserTalk/AsyGetTalk?TalkId=" + this.id
      })
        .then(res => {
          this.newtext = res.data[0];
          this.form.userId = this.newtext.userId;
          this.form.talkText = this.newtext.talkText;
          this.form.talkTime = this.newtext.talkTime;
          this.form.talkRead = this.newtext.talkRead;
          this.form.talkGive = this.newtext.talkGive;
          this.form.commentId = this.newtext.commentId;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },
    // 更新数据
    onSubmit() {
      this.$api({
        // up
        url: "/api/SnUserTalk/AysUpArticle",
        method: "put",
        data: {
          id: Number(this.newtext.id),
          userId: Number(this.form.userId),
          talkText: this.form.talkText,
          talkTime: this.form.talkTime,
          talkRead: Number(this.form.talkRead),
          talkGive: Number(this.form.talkGive),
          commentId: Number(this.form.commentId)
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.$notify({
              title: "更新成功",
              message: res.statuss,
              type: "success"
            });
            this.$router.push("./SnUserTalk");
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
