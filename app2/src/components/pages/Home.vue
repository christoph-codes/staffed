<template>
	<div class="Home">
		<Hero>
			<div
				class="is-flex is-align-items-center is-justify-content-space-between"
			>
				<div class="action-section is-justify-content-center is-flex-grow-1">
					<h1>Shift management made easy.</h1>
					<router-link to="/features"
						><button class="button is-medium is-primary">
							Get Started
						</button></router-link
					>
				</div>
				<div class="hero-img">
					<img
						class="is-flex is-justify-content-flex-start"
						src="@/assets/home-hero.png"
					/>
				</div>
			</div>
		</Hero>
		<PageTemplate>
			<h1>Welcome to Staffed.</h1>
			<p>This app exists simply to make contract employee management easier.</p>
		</PageTemplate>
	</div>
</template>

<script>
	import Hero from '@/components/layouts/Hero';
	import PageTemplate from '@/components/layouts/PageTemplate';

	export default {
		name: 'Home',
		data() {
			return {};
		},
		components: {
			Hero,
			PageTemplate,
		},
	};
</script>

<style lang="scss" scoped>
	.Home {
		.Hero {
			background: var(--green);
			margin-bottom: 120px;
			.action-section {
				text-align: left;
				h1 {
					font-size: 60px;
					line-height: 1;
					color: white;
					font-weight: bold;
					margin-bottom: 15px;
				}
				.button {
					background: var(--orange);
					transition: 0.3s;
					&:hover {
						background: var(--lgray);
						color: var(--orange);
					}
				}
			}
			.hero-img {
				max-width: 500px;
				margin-bottom: -100px;
			}
		}
	}
</style>
