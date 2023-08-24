<script>
	export let title;
	export let data;
</script>

<div class="outer-container-box py-3">
	<p class="card-title">{title}</p>
	<hr />
	<p class="card-data">{data}</p>
</div>

<style>
	.card-title {
		text-align: center;
		color: white;
		font-weight: bold;
		font-size: 20px;
	}
	.card-data {
		text-align: center;
		color: white;
		font-size: 18px;
	}
	.outer-container-box {
		width: 100%;
		height: 100%;
		background: rgba(56, 194, 245, 0.6);
		color: white;
		border-radius: 15px;
		box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
	}
</style>
