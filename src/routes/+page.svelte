<script>
	import { t, locale } from '../lib/locale/i18n.js';
	export let data;

	if (data?.language !== undefined) {
		$locale = data?.language;
	}
</script>

<div class="container container-box">
	<div class="row mt-5">
		<h1>{$t('home.welcome')}</h1>
	</div>

	<div class="row mt-5">
		<h3>
			<p>{$t('home.visit')} <a href="https://kit.svelte.dev">kit.svelte.dev</a></p>
		</h3>
	</div>

	<div class="row mt-5">
		<h4>
			{$t('home.login')} <a href="/login">Log in</a>
		</h4>
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
</style>
