<template>
	<div class="Navform">
		<div class="Navform-1">
			<el-page-header @back="goBack" content="文章内容"> </el-page-header>
		</div>
		<div class="Navform-2">
			<el-form ref="form" :model="form" label-width="80px" size="small">
				<el-row>
					<el-col :span="24">
						<el-form-item label="名称">
							<el-input v-model="form.sortName"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="别名">
							<el-input v-model="form.sortAlias"></el-input>
						</el-form-item>
					</el-col>
					<el-col :span="24">
						<el-form-item label="描述">
							<el-input v-model="form.sortDescription"></el-input>
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
</template>
<script>
	export default {
		data() {
			return {
				form: {
					sortId: 0,
					sortName: "",
					sortAlias: "",
					sortDescription: "",
					parentSortId: 0
				},
				id: this.$route.query.id,
				newtext: []
			};
		},
		created() {
			this.getall(this.id);
		},
		methods: {
			getall(id) {
				this.$api({
						url: "/api/SnSort/AsyGetSortId?sortId=" + id
					})
					.then(res => {
						this.newtext = res.data[0];
						this.form.sortId = id;
						this.form.sortName = this.newtext.sortName;
						this.form.sortAlias = this.newtext.sortAlias;
						this.form.sortDescription = this.newtext.sortDescription;

					})
					.catch(e => {
						console.log(e + "获取数据失败");
					});
			},
			onSubmit() {
				this.$api({
						url: "/api/SnSort/AysUpSort",
						method: "put",
						data: {
							sortId: this.newtext.sortId,
							sortName: this.form.sortName,
							sortAlias: this.form.sortAlias,
							sortDescription: this.form.sortDescription,
							parentSortId: this.form.parentSortId,
						}
					})
					.then(res => {
						if (res.status === 200) {
							this.$message({
								type: "success",
								message: "更新成功!"
							});
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
