<template>
  <div>
    <el-header>
      <SnHeader></SnHeader>
    </el-header>
    <Sidebar></Sidebar>
    <div class="Navform">
      <div class="Navform-1">
        <el-page-header @back="goBack" content="Talk内容"> </el-page-header>
      </div>
      <div class="Navform-2">
        <el-form ref="form" :model="form" label-width="80px" size="small">
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题">
                <el-input v-model="form.talkTitle"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="内容简述">
                <el-input v-model="form.talkBrief"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="6">
              <el-form-item label="发表人">
                <el-input v-model="form.userId"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="时间">
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
              <el-form-item label="分类">
                <el-select v-model="labelvalue" filterable placeholder="请选择">
                  <el-option
                    v-for="item in labeltest"
                    :key="item.talkId"
                    :label="item.type"
                    :value="item.talkId"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="内容">
                <!-- <el-input v-model="form.text"></el-input> -->
                <!-- <div class="editor-text">
                  <div class="editor-text-1">
                    <mavon-editor
                      v-model="form.talkText"
                      :subfield="true"
                      :boxShadow="false"
                      defaultOpen="preview"
                      :toolbarsFlag="true"
                    />
                  </div>
                </div> -->

                <div id="div1">
                  <!-- Two-way Data-Binding -->
                  <quill-editor
                    ref="myQuillEditor"
                    v-model="form.talkText"
                    :options="editorOption"
                    @blur="onEditorBlur($event)"
                    @focus="onEditorFocus($event)"
                    @ready="onEditorReady($event)"
                    class="editor"
                  />
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
  </div>
</template>
<script>
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线 -----['bold', 'italic', 'underline', 'strike']
  ["blockquote", "code-block"], // 引用  代码块-----['blockquote', 'code-block']
  [
    {
      header: 2
    },
    {
      header: 3
    }
  ], // 1、2 级标题-----[{ header: 1 }, { header: 2 }]
  [
    {
      list: "ordered"
    },
    {
      list: "bullet"
    }
  ], // 有序、无序列表-----[{ list: 'ordered' }, { list: 'bullet' }]
  [
    {
      script: "sub"
    },
    {
      script: "super"
    }
  ], // 上标/下标-----[{ script: 'sub' }, { script: 'super' }]
  [
    {
      indent: "-1"
    },
    {
      indent: "+1"
    }
  ], // 缩进-----[{ indent: '-1' }, { indent: '+1' }]
  [
    {
      direction: "rtl"
    }
  ], // 文本方向-----[{'direction': 'rtl'}]
  [
    {
      size: ["small", false, "large", "huge"]
    }
  ], // 字体大小-----[{ size: ['small', false, 'large', 'huge'] }]
  [
    {
      header: [1, 2, 3, 4, 5, 6, false]
    }
  ], // 标题-----[{ header: [1, 2, 3, 4, 5, 6, false] }]
  [
    {
      color: []
    },
    {
      background: []
    }
  ], // 字体颜色、字体背景颜色-----[{ color: [] }, { background: [] }]
  [
    {
      font: []
    }
  ], // 字体种类-----[{ font: [] }]
  [
    {
      align: []
    }
  ], // 对齐方式-----[{ align: [] }]
  ["clean"], // 清除文本格式-----['clean']
  ["image", "video"] // 链接、图片、视频-----['link', 'image', 'video']
];

export default {
  components: {
    quillEditor
  },
  data() {
    return {
      form: {
        id: 0,
        userId: 4,
        talkTime: "",
        talkTitle: "",
        talkBrief: "",
        talkText: "",
        talkRead: 0,
        talkGive: 0,
        talkComment: 0,
        talkTypeId: 0
      },
      id: this.$route.query.id,
      labelvalue: "",
      labeltest: [],
      //富文本编辑器配置
      editorOption: {
        //  富文本编辑器配置
        modules: {
          //工具栏定义的
          toolbar: toolbarOptions
        },
        //主题
        theme: "snow",
        placeholder: "请输入正文"
      },

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
    //失去焦点事件
    onEditorBlur(quill) {
      console.log("editor blur!", quill);
    },
    //获得焦点事件
    onEditorFocus(quill) {
      console.log("editor focus!", quill);
    },
    // 准备富文本编辑器
    onEditorReady(quill) {
      console.log("editor ready!", quill);
    },
    //内容改变事件
    onEditorChange({ quill, html, text }) {
      console.log("editor change!", quill, html, text);
      this.content = html;
    },

    // 	uploadImg: async function() {
    // 		var _this = this;
    // 		//构造formData对象
    // 		var formData = new FormData();
    // 		formData.append("file", document.getElementById(_this.uniqueId).files[0]);

    // 		try {
    // 			//调用上传文件接口
    // 			this.$http.productapi.uploadImgReq(formData).then(res => {
    // 				//返回上传文件的地址
    // 				let url = res;
    // 				if (url != null && url.length > 0) {
    // 					let Range = _this.editor.getSelection();
    // 					url = url.indexOf("http") != -1 ? url : "http:" + url;
    // 					//上传文件成功之后在富文本中回显(显示)
    // 					_this.editor.insertEmbed(
    // 						Range != null ? Range.index : 0,
    // 						"image",
    // 						url
    // 					);
    // 				} else {
    // 					_this.$message.warning("图片上传失败");
    // 				}
    // 				//成功之后,将文件的文本框的value置空
    // 				document.getElementById(_this.uniqueId).value = "";
    // 			});
    // 		} catch ({
    // 			message: msg
    // 		}) {
    // 			document.getElementById(_this.uniqueId).value = "";
    // 			_this.$message.warning(msg);
    // 		}
    // 	}
    // },
    // 加载分类 标签
    getall(id) {
      this.$api({
        url: "/api/SnTalkType/GetAllAsync"
      })
        .then(res => {
          this.labeltest = res.data;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });

      this.$api({
        url: "api/SnTalk/GetAllAsyncID?id=" + id
      })
        .then(res => {
          this.newtext = res.data[0];
          this.form.id = id;
          this.form.userId = this.newtext.userId;
          this.form.talkTime = this.newtext.talkTime;
          this.form.talkTitle = this.newtext.talkTitle;
          this.form.talkBrief = this.newtext.talkBrief;
          this.form.talkText = this.newtext.talkText;
          this.form.talkRead = this.newtext.talkRead;
          this.form.talkGive = this.newtext.talkGive;
          this.form.talkComment = this.newtext.talkComment;
          this.labelvalue = this.newtext.talkTypeId;
        })
        .catch(e => {
          console.log(e + "获取数据失败");
        });
    },

    // 更新数据
    onSubmit() {
      this.$api({
        // add
        url: "/api/SnTalk/UpdateAsync",
        method: "put",
        data: {
          id: this.newtext.id,
          userId: Number(this.form.userId),
          talkTime: this.form.talkTime,
          talkTitle: this.form.talkTitle,
          talkBrief: this.form.talkBrief,
          talkText: this.form.talkText,
          talkRead: 0,
          talkGive: 0,
          talkComment: 0,
          talkTypeId: Number(this.labelvalue)
        }
      })
        .then(res => {
          if (res.status === 200) {
            this.$message({
              type: "success",
              message: "更新成功!"
            });
            this.$router.push("./SnTalk");
          } else {
            alert("更新成功");
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

<style lang="scss">
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

.editor {
  line-height: normal !important;
  height: 500px;
}

.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}

.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}

.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}

.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}

.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>
