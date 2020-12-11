<template>
	<div class="Hero is-flex is-justify-content-center is-align-items-center">
		<div class="container">
			<div class="hero-content">
				<slot/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
        name: 'Hero'
    };
</script>

<style lang="scss" scoped>
.Hero {
    height: 400px;
    text-align: center;
}
</style>
