<script>
	import { enhance } from '$app/forms';
	import { t, locale, locales } from '../../lib/locale/i18n.js';
	import { addToast } from '../../store/store';
	import { createEventDispatcher } from 'svelte';
	/**
	 * @type {any}
	 */
	export let propValue;
	let isLoading = false;

	let selected = '';

	let isDisabled = propValue === undefined ? true : false;

	/**
	 * @type {any}
	 */

	$: navigation = [
		{
			href: '/',
			name: $t('navbar.home')
		},
		{
			href: '/dashboard',
			name: `${propValue ? '' : '🔒'}` + $t('navbar.dashboard')
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
</script>

<nav class="navbar navbar-expand-lg navbar-light bg-light">
	<div class="container-fluid">
		<a class="navbar-brand" href="#"> {$t('navbar.brand')}</a>
		<button
			class="navbar-toggler"
			type="button"
			data-bs-toggle="collapse"
			data-bs-target="#navbarSupportedContent"
			aria-controls="navbarSupportedContent"
			aria-expanded="false"
			aria-label="Toggle navigation"
		>
			<span class="navbar-toggler-icon" />
		</button>
		<div class="collapse navbar-collapse" id="navbarSupportedContent">
			<ul class="navbar-nav me-auto mb-2 mb-lg-0">
				{#each navigation as link}
					<li class="nav-item">
						<a class="nav-link" href={link.href}> {link.name}</a>
					</li>
				{/each}
			</ul>
			{#if propValue}
				<div class="d-flex">
					<form
						method="POST"
						action="?/setln"
						use:enhance={() => {
							isLoading = true;
							return async ({ result, update }) => {
								await update();
								isLoading = false;
								addToast({
									message: `${result?.data?.message}  ${result?.data?.new_language}`,
									type: result?.data?.code == 0 ? 'success' : 'error',
									dismissible: true,
									timeout: 4000
								});

								//creating = false;
							};
						}}
					>
						{#if !isLoading}
							<div class="group d-flex">
								<select
									name="language"
									id="language"
									bind:value={$locale}
									class="form-select"
									aria-label="Disabled select example"
								>
									{#each locales as l}
										<option value={l}>{l}</option>
									{/each}
								</select>

								<input type="submit" class="btn btn-success" value={$t('navbar.save')} />
							</div>
						{/if}
					</form>
					<button on:click={handleSignOut} class="btn btn-dark mx-5">
						{$t('navbar.logout')}
					</button>
				</div>
			{:else}
				<form class="d-flex">
					<a href="/login" class="btn btn-info"> {$t('navbar.login')} </a>
				</form>
			{/if}
		</div>
	</div>
</nav>
