import Vue from 'vue';
import Router from 'vue-router';
import MainView from '../components/layouts/MainView';
import Home from '../components/pages/Home';
import Features from '../components/pages/Features';

Vue.use(Router);

const router = new Router({
	routes: [
		{
			path: '/',
			name: 'MainView',
			component: MainView,
			children: [
				{
					path: '/',
					name: 'Home',
					component: Home,
        },
        {
					path: '/features',
					name: 'Features',
					component: Features,
				},
			],
		},
	],
});

//   router.beforeEach((to, from, next) => {
//     // check to see if route requires auth
//     if (to.matched.some(rec => rec.meta.requiresAuth)) {
//       // check auth state of user
//       let user = firebase.auth().currentUser;
//       if (user) {
//         // user signed in, proceed to route
//         next()
//       } else {
//         // no user signed in redirect to login
//         next({
//           name: 'AdminLogin'
//         })
//       }
//     } else {
//       next()
//     }
//   })
export default router;
