<script>
	import { t, locale, locales } from '../../lib/locale/i18n.js';
	import Toasts from '../../lib/components/Toasts.svelte';
	import CardData from '../../lib/components/CardData.svelte';
	import ExpChart from '../../lib/components/ExpChart.svelte';

	export let data;
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

		<div class="row mt-4">
			<div class="col-12 col-md-4 py-2">
				<CardData title={$t('dashboard.card_max_velocity')} data={data.max_position} />
			</div>
			<div class="col-12 col-md-4 py-2">
				<CardData
					title={$t('dashboard.card_max_distance') + ' (m)'}
					data={data.max_velocity.toFixed(6)}
				/>
			</div>
			<div class="col-12 col-md-4 py-2">
				<CardData title={$t('dashboard.card_max_time') + ' (ms)'} data={data.max_distances} />
			</div>
		</div>

		<div class="row mt-4">
			<ExpChart
				positions={data.motor_positions}
				timestamps={data.timestamps}
				title={$t('dashboard.chart_position_title')}
				desc={$t('dashboard.chart_position_desc')}
			/>
		</div>
		<hr />
		<div class="row mt-4">
			<ExpChart
				positions={data.motor_velocity}
				timestamps={data.timestamps}
				title={$t('dashboard.chart_velocity_title')}
				desc={$t('dashboard.chart_velocity_desc')}
			/>
		</div>
		<div class="row mt-4">
			<ExpChart
				positions={data.motor_distance}
				timestamps={data.timestamps}
				title={$t('dashboard.chart_distance_title')}
				desc={$t('dashboard.chart_distance_desc')}
			/>
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
