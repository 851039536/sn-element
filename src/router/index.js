import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";


Vue.use(VueRouter);

const routes = [{
		path: "/",
		name: "Home",
		component: Home
	},
	{
		path: "/SnNavigation",
		name: "SnNavigation",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import( /* webpackChunkName: "about" */ "../views/SnNavTest/SnNavigation.vue")
	},
	{
		path: "/SnArticle",
		name: "SnArticle",
		component: () =>
			import( /* webpackChunkName: "about" */ "../views/SnNavTest/SnArticle.vue")
	},
	
	{
		path: "/Navform",
		name: "Navform",
		component: () =>
			import( /* webpackChunkName: "about" */ "../views/SnForm/Navform.vue")
	}
];

const router = new VueRouter({
	routes
});

export default router;
