<!-- Header -->
<template>
	<div class="is-align-self-flex-start" id="header">
		<div class="container is-flex is-justify-content-space-between">
			<div class="main-logo">
				<router-link to="/">
					<img
						class="is-flex is-justify-content-flex-start"
						src="@/assets/logo.png"
					/>
				</router-link>
			</div>
			<div
				class="navbar is-justify-content-flex-end is-flex is-align-items-center"
			>
				<ul>
					<li class="list-item">
						<router-link to="/features">Features</router-link>
					</li>
					<li class="list-item">
						<router-link to="/pricing">Pricing</router-link>
					</li>
					<li v-if="user" class="list-item">
						<router-link to="/help">Help</router-link>
					</li>
					<li v-if="!user" class="list-item">
						<router-link to="/faq">FAQ</router-link>
					</li>
					<li v-if="!user" class="list-item">
						<router-link to="/adminsignup">Signup</router-link>
					</li>
					<li v-if="!user" class="list-item">
						<router-link to="/login">Login</router-link>
					</li>
					<li v-if="user" class="list-item">
						<router-link to="/admin/home">Dashboard</router-link>
					</li>
					<li v-if="user" class="list-item">
						<a @click="logout">Logout</a>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>

<script>
	// import firebase from 'firebase';

	export default {
		name: 'Header',
		data() {
			return {
				user: null,
			};
		},
		// created() {
		//     firebase.auth().onAuthStateChanged((user) => {
		//         if(user) {
		//             this.user = user;
		//         } else {
		//             this.user = null
		//         }
		//     })
		// },
		// methods: {
		//     logout() {
		//         firebase.auth().signOut()
		//         .then(() => {
		//             this.$router.push({ name: 'AdminLogin' });
		//         })
		//     }
		// }
	};
</script>

<style lang="scss" scoped>
	#header {
		padding: 5px 0;
		width: 100%;
		z-index: 1;
		background: var(--green);
		.main-logo {
			display: grid;
			align-items: center;
			img {
				height: 50px;
				width: auto;
			}
		}
		.navbar {
			min-height: 3.25rem;
			background: transparent;
			ul {
				margin: 0;
				float: right;
				.list-item {
					display: inline-block;
					border: none;

					a {
						color: white;
						text-transform: uppercase;
						font-size: 14px;
						display: inline-block;
						line-height: 46px;
						padding: 10px;
						&.router-link-exact-active {
							font-weight: bold;
						}
					}
				}
			}
		}
	}
</style>
