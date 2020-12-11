<template>
	<div class="is-align-self-flex-end" id="footer">
		<div class="container">
			<p>
				Copyright © 2018. Staffed, a Boost Inc Company. All Rights Reserved.
			</p>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'Footer',
		data() {
			return {};
		},
	};
</script>

<style lang="scss" scoped>
	#footer {
		background: var(--lgray);
		padding: 10px 0;
		bottom: 0;
		width: 100%;
		height: 35px;
		p {
			color: var(--dgray);
			font-size: 10px;
			margin: 0;
		}
	}
</style>
