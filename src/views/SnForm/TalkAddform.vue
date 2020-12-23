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
								<el-date-picker v-model="form.talkTime" align="right" type="date" placeholder="选择日期" :picker-options="pickerOptions">
								</el-date-picker>
							</el-form-item>
						</el-col>
						<el-col :span="12">
							<el-form-item label="分类">
								<el-select v-model="labelvalue" filterable placeholder="请选择">
									<el-option v-for="item in labeltest" :key="item.talkId" :label="item.type" :value="item.talkId">
									</el-option>
								</el-select>
							</el-form-item>
						</el-col>

						<el-col :span="24">
							<el-form-item label="内容">
								<!-- <el-input v-model="form.text"></el-input> -->
								<div class="editor-text">
									<div class="editor-text-1">
										<mavon-editor v-model="form.talkText" :subfield="true" :boxShadow="false" defaultOpen="preview" :toolbarsFlag="true" />
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

	</div>
</template>
<script>
	export default {
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
					talkTypeId: 0,
				},
				labelvalue: "",
				labeltest: [],
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
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
						url: "/api/SnTalkType/GetAllAsync"
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
						url: "/api/SnTalk/AddAsync",
						method: "post",
						data: {
							id: 0,
							userId: Number(this.form.userId),
							talkTime: this.form.talkTime,
							talkTitle: this.form.talkTitle,
							talkBrief: this.form.talkBrief,
							talkText: this.form.talkText,
							talkRead: 0,
							talkGive: 0,
							talkComment: 0,
							talkTypeId: Number(this.labelvalue),
						}
					})
					.then(res => {
						if (res.status === 200) {
							this.$message({
								type: "success",
								message: "添加成功!"
							});
							this.$router.push("./SnTalk");
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
