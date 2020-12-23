<template>
  <div>
    <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>
    <div class="Navform">
      <div class="Navform-1">
        <el-page-header @back="goBack" content="用户内容"> </el-page-header>
      </div>
      <div class="Navform-2">
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-row>
            <el-col :span="12">
              <el-form-item label="ip">
                <el-input v-model="form.userIp"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="用户名">
                <el-input v-model="form.userName" :disabled="true"></el-input>
              </el-form-item>
            </el-col>
            <!--  <el-col :span="12">
            <el-form-item label="时间">
              <el-date-picker
                v-model="form.userTime"
                align="right"
                type="date"
                placeholder="选择日期"
                :picker-options="pickerOptions"
              >
              </el-date-picker>
            </el-form-item>
          </el-col> -->

            <el-col :span="12">
              <el-form-item label="时间">
                <el-input v-model="form.userTime" :disabled="true"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="12">
              <el-form-item label="邮箱">
                <el-input v-model="form.userEmail"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="密码">
                <el-input v-model="form.userPwd"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="头像">
                <el-input v-model="form.userPhoto"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="图片路径">
                <el-select
                  v-model="form.userPhoto"
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
            <el-col :span="12">
              <el-form-item label="称呼">
                <el-input v-model="form.userNickname"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="简介">
                <el-input v-model="form.userBrief"></el-input>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item>
                <el-button type="primary" @click="onSubmit()">put</el-button>
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
        userId: 0,
        userIp: "",
        userName: "",
        userEmail: "",
        userPwd: "",
        userPhoto: "",
        userTime: "",
        userNickname: "",
        userBrief: ""
      },
      id: this.$route.query.id,
      newtext: [],
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
    getall() {
      // 窗体赋值
      this.$api({
        url: "/api/SnUser/AsyGetUserId?UserId=" + this.id
      })
        .then(res => {
          this.newtext = res.data[0];

          this.form.userIp = this.newtext.userIp;
          this.form.userName = this.newtext.userName;
          this.form.userEmail = this.newtext.userEmail;
          this.form.userPwd = this.newtext.userPwd;
          this.form.userPhoto = this.newtext.userPhoto;
          this.form.userTime = this.newtext.userTime;
          this.form.userNickname = this.newtext.userNickname;
          this.form.userBrief = this.newtext.userBrief;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });

      // 加载图床
      this.$api({
        url:
          "/api/SnPicture/GetFyTypeAllAsync?type=2&pageIndex=1&pageSize=100&isDesc=true"
      })
        .then(res => {
          this.imgtest = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },

    // 添加数据
    onSubmit() {
      this.$api({
        // up
        url: "/api/SnUser/AysUpUser",
        method: "put",
        data: {
          userId: this.newtext.userId,
          userIp: this.form.userIp,
          userName: this.form.userName,
          userEmail: this.form.userEmail,
          userPwd: this.form.userPwd,
          userPhoto: this.form.userPhoto,
          userTime: this.form.userTime,
          userNickname: this.form.userNickname,
          userBrief: this.form.userBrief
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.$notify({
              title: "更新成功",
              message: res.statuss,
              type: "success"
            });
            this.$router.push("./SnUser");
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
