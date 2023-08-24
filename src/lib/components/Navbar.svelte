<script>
	import { t, locale, locales } from '../../lib/locale/i18n.js';

	import { createEventDispatcher } from 'svelte';
	/**
	 * @type {any}
	 */
	export let propValue;

	let isDisabled = propValue === undefined ? true : false;

	//import { user } from '../../store/store.js';

	/**
	 * @type {any}
	 */

	$: navigation = [
		{
			href: '/',
			name: 'Home'
		},
		{
			href: '/dashboard',
			name: `${propValue ? '' : '🔒'} Dashboard`
		}
	];

	// Create a locale specific timestamp
	$: time = new Date().toLocaleDateString($locale, {
		weekday: 'long',
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	});

	const dispatch = createEventDispatcher();

	const handleSignOut = () => {
		dispatch('signout', {
			signout: true
		});
	};

	const onChange = async () => {
		const api_url = import.meta.env.VITE_API_DEV_URL;

		const response = await fetch(`${api_url}/set_language`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				language: $locale
			})
		});

		const body = await response.json();

		if (response.status === 200) {
			// TODO: Handle ok language change
		} else {
			// TODO: show msg on language set failed
		}
	};
	//$locale = 'es';
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
	<a class="navbar-brand" href="#">Navbar</a>
	<button
		class="navbar-toggler"
		type="button"
		data-toggle="collapse"
		data-target="#navbarNav"
		aria-controls="navbarNav"
		aria-expanded="false"
		aria-label="Toggle navigation"
	>
		<span class="navbar-toggler-icon" />
	</button>
	<div class="collapse navbar-collapse" id="navbarNav">
		<ul class="navbar-nav">
			{#each navigation as link}
				<li class="nav-item">
					<a class="nav-link" href={link.href}> {link.name}</a>
				</li>
			{/each}

			{#if propValue}
				<li>
					<button on:click={handleSignOut} class="btn btn-dark"> Logout </button>
				</li>
			{:else}
				<li>
					<a href="/login" class="btn btn-info"> Login </a>
				</li>
			{/if}
		</ul>
		<div class="form-inline mx-2">
			<select
				bind:value={$locale}
				on:change={onChange}
				class="form-select"
				aria-label="Disabled select example"
				disabled={isDisabled}
			>
				{#each locales as l}
					<option value={l}>{l}</option>
				{/each}
			</select>
		</div>
	</div>
</nav>
