<script>
	import Chart from 'svelte-frappe-charts';
	export let title;
	export let desc;
	export let positions;
	export let timestamps;

	let chartRef;

	let chartData = {
		title: 'Chart',
		labels: timestamps,
		datasets: [
			{
				values: positions
			}
		]
	};

	const onExport = () => chartRef.exportChart();

	const onDataSelect = (event) => {
		selected = event;
	};

	let selected;
</script>

<div class="outer-container-box py-3">
	<p class="char-title">{title}</p>
	<Chart
		data={chartData}
		title={desc}
		type="line"
		height="500"
		bind:this={chartRef}
		on:data-select={onDataSelect}
		isNavigable
	/>
	<button class="btn btn-dark" on:click={onExport}> Export </button>
</div>

<style>
	.char-title {
		text-align: center;
		color: black;
		font-weight: bold;
		font-size: 32px;
	}
	.outer-container-box {
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.6);
		color: white;
		border-radius: 15px;
	}
</style>
