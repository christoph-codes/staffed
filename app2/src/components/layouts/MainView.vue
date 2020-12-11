<template>
	<div class="MainView is-flex is-flex-direction-row is-flex-wrap-wrap">
		<Header />
		<div class="page-content is-align-self-stretch is-flex-grow-1">
			<router-view></router-view>
		</div>
		<Footer />
	</div>
</template>

<script>
	import Header from '@/components/layouts/Header';
	import Footer from '@/components/layouts/Footer';

	export default {
		name: 'MainView',
		data() {
			return {};
		},
		components: {
			Header,
			Footer,
		},
	};
</script>

<style lang="scss" scoped>
	.MainView {
		display: flexbox;
		height: 100vh;
		.page-content {
			min-height: 100%;
			// width: 100%;
		}
	}
</style>
