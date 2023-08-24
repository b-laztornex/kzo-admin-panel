<script>
	import { t, locale, locales } from '../../lib/locale/i18n.js';
	import Toasts from '../../lib/components/Toasts.svelte';

	import LineChart from '../../lib/components/LineChart.svelte';
	export let data;
	let chartData = data.position;
	let velocityChartData = data.velocity;
	$locale = data.language;
</script>

<svelte:head>
	<title>Dashboard</title>
	<meta name="description" content="chartData analythics" />
</svelte:head>
<Toasts />
<div class="px-2 outer-container-box">
	<div class="container container-box">
		<div class="row">
			<h1>{$t('dashboard.welcome')}</h1>
		</div>
		<div class="row">
			<LineChart data={chartData} />
		</div>
		<div class="row">
			<LineChart data={velocityChartData} />
		</div>
	</div>
</div>

<style>
	.container-box {
		width: 100%;
		height: 100%;
		padding: 90px 70px 50px 70px;
		background: rgba(0, 0, 0, 0.8);
		color: white;
	}

	.outer-container-box {
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.5);
		color: white;
	}
</style>
