<template>
	<div>
		<div
			v-if="size === 'small'"
			class="spinner-border spinner-border-sm"
			role="status"
		>
			<span class="sr-only">Loading...</span>
		</div>
		<div v-else class="loading-container">
			<div class="spinner-border" role="status">
				<span class="sr-only">Loading...</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Loading',
	props: {
		size: {
			type: String,
		},
	},
};
</script>

<style>
.loading-container {
	height: 10vh;
	display: flex;
	justify-content: center;
	align-items: center;
}
</style>
