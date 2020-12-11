<template>
	<section class="PageTemplate">
		<div class="container is-max-desktop">
			<slot />
		</div>
	</section>
</template>

<script>
	export default {
		name: 'PageTemplate',
	};
</script>

<style lang="scss" scoped>
	.PageTemplate {
		padding: 50px 0;
	}
</style>
