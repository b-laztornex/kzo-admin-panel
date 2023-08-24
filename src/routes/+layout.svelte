<script>
	import Navbar from '../lib/components/Navbar.svelte';
	import { goto } from '$app/navigation';

	export let data;

	/**
	 * @param {{ detail: { signout: any; }; }} event
	 */
	async function handleSignOut(event) {
		const status = event.detail.signout;
		await goto(`logout/?signout=${status}`);
	}
</script>

<div class="app">
	<Navbar on:signout={handleSignOut} propValue={data.token} />
	<div class="">
		<slot />
	</div>
</div>
