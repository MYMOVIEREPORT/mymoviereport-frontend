<template>
	<apexchart
		v-if="series.length > 0"
		type="donut"
		width="380"
		:options="chartOptions"
		:series="series"
	/>
</template>

<script>
import VueApexCharts from 'vue-apexcharts';

export default {
	components: {
		apexchart: VueApexCharts,
	},
	props: {
		posts: {
			type: Array,
		},
	},
	watch: {
		posts: {
			handler() {
				this.updateChart();
			},
		},
	},
	methods: {
		updateChart() {
			let genres = new Map();
			this.posts.forEach(post => {
				let genre = post.movie.genre.name;
				if (genres.has(genre)) {
					const value = genres.get(genre);
					genres.set(genre, value + 1);
				} else {
					genres.set(genre, 1);
				}
			});
			genres.forEach((value, key) => {
				this.series.push(value);
				this.chartOptions.labels.push(key);
			});
		},
	},
	data() {
		return {
			series: [],
			chartOptions: {
				labels: [],
				responsive: [
					{
						breakpoint: 480,
						options: {
							chart: {
								width: 200,
							},
							legend: {
								position: 'bottom',
							},
						},
					},
				],
			},
		};
	},
	mounted() {
		this.updateChart();
	},
};
</script>

<style></style>
