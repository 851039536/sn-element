<template>
	<div>
		<!-- 		<el-header>
			<SnHeader></SnHeader>
		</el-header>
		<Sidebar></Sidebar> -->
		<router-view></router-view>
	</div>
</template>

<script>
	// import Sidebar from "./sidebar/Sidebar.vue";
	// import SnHeader from "./SnHeader/SnHeader.vue";
	export default {
		name: "Home",
		components: {
			// Sidebar,
			// SnHeader
		}
	};
</script>
<style>
	.home {
		height: 100px;
		width: 100%;

		background-color: #ee7700;
	}
</style>
