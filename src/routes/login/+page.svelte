<script>
	import { enhance } from '$app/forms';
	import Toasts from '../../lib/components/Toasts.svelte';
	import { addToast } from '../../store/store';
	import { t, locale } from '../../lib/locale/i18n.js';
	import { goto } from '$app/navigation';

	export let form;
	export let data;

	let isLoading = false;
	let email = '';
	let password = '';

	if (data?.language !== undefined) {
		$locale = data?.language;
	}
</script>

<Toasts />

<div class="login-wrap">
	<div class="login-html">
		<form
			method="POST"
			use:enhance={() => {
				isLoading = true;
				return async ({ result, update }) => {
					await update();
					isLoading = false;
					let data = result?.data;
					addToast({
						message: data?.message,
						type: data.code == 0 ? 'success' : 'error',
						dismissible: true,
						timeout: 4000
					});
					if (data.code == 0) {
						await goto('dashboard');
					}
					//creating = false;
				};
			}}
		>
			{#if !isLoading}
				<h1>{$t('loginpage.login')}</h1>
				<input id="tab-1" type="radio" name="tab" class="sign-in" checked /><label
					for="tab-1"
					class="tab">{$t('loginpage.sign_in')}</label
				>
				<input id="tab-2" type="radio" name="tab" class="for-pwd" /><label for="tab-2" class="tab"
					>{$t('loginpage.forgot_password')}</label
				>
				<div class="login-form">
					<div class="sign-in-htm">
						<div class="group">
							<label for="email" class="label">{$t('loginpage.username')}</label>
							<input type="text" class="w-100" name="email" bind:value={email} required />
						</div>
						<div class="group">
							<label for="password" class="label">{$t('loginpage.password')}</label>
							<input type="password" class="w-100" name="password" bind:value={password} required />
						</div>
						<div class="group">
							<input type="submit" class="button" value="Sign In" />
						</div>
						<div class="hr" />

						{#if form?.incorrect}<p class="alert alert-danger">
								{$t('loginpage.invalid_credentials')}
							</p>{/if}
					</div>
					<div class="for-pwd-htm">
						<div class="group">
							<label for="user" class="label">{$t('loginpage.username')}</label>
							<input id="user" type="text" class="input" />
						</div>
						<div class="group">
							<input type="submit" class="button" value="Reset Password" />
						</div>
						<div class="hr" />
					</div>
				</div>
			{:else}
				<div class="d-flex justify-content-center">
					<div class="spinner-border text-light" role="status">
						<span class="sr-only" />
					</div>
				</div>
				<div class="d-flex justify-content-center mt-5">
					<button class="btn btn-primary" type="button" disabled>
						<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true" />
						{$t('loginpage.wating_time')}
					</button>
				</div>
			{/if}
		</form>
	</div>
</div>

<style>
	:global(.touched:invalid) {
		border-color: red;
		outline-color: red;
	}
	.login-wrap h1 {
		color: whitesmoke;
	}
	.clearfix:after,
	.clearfix:before {
		content: '';
		display: table;
	}
	.clearfix:after {
		clear: both;
		display: block;
	}
	a {
		color: inherit;
		text-decoration: none;
	}

	.login-wrap {
		width: 100%;
		margin: auto;
		max-width: 510px;
		min-height: 510px;
		position: relative;

		background-size: cover;
		box-shadow: 0 12px 15px 0 rgba(0, 0, 0, 0.24), 0 17px 50px 0 rgba(0, 0, 0, 0.19);
	}
	.login-html {
		width: 100%;
		height: 100%;
		position: absolute;
		padding: 90px 70px 50px 70px;
		background: rgba(0, 0, 0, 0.8);
	}
	.login-html .sign-in-htm,
	.login-html .for-pwd-htm {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
		-webkit-transform: rotateY(180deg);
		transform: rotateY(180deg);
		-webkit-backface-visibility: hidden;
		backface-visibility: hidden;
		-webkit-transition: all 0.4s linear;
		transition: all 0.4s linear;
	}
	.login-html .sign-in,
	.login-html .for-pwd,
	.login-form .group .check {
		display: none;
	}
	.login-html .tab,
	.login-form .group .label,
	.login-form .group .button {
		text-transform: uppercase;
	}
	.login-html .tab {
		font-size: 22px;
		margin-right: 15px;
		padding-bottom: 5px;
		margin: 0 15px 10px 0;
		display: inline-block;
		border-bottom: 2px solid transparent;
	}
	.login-html .sign-in:checked + .tab,
	.login-html .for-pwd:checked + .tab {
		color: #fff;
		border-color: #1161ee;
	}
	.login-form {
		min-height: 345px;
		position: relative;
		-webkit-perspective: 1000px;
		perspective: 1000px;
		-webkit-transform-style: preserve-3d;
		transform-style: preserve-3d;
	}
	.login-form .group {
		margin-bottom: 15px;
	}
	.login-form .group .label,
	.login-form .group .input,
	.login-form .group .button {
		width: 100%;
		color: #fff;
		display: block;
	}
	.login-form .group .input,
	.login-form .group .button {
		border: none;
		padding: 15px 20px;
		border-radius: 25px;
		background: rgba(255, 255, 255, 0.1);
	}
	.login-form .group input[data-type='password'] {
		text-security: circle;
		-webkit-text-security: circle;
	}
	.login-form .group .label {
		color: #aaa;
		font-size: 12px;
	}
	.login-form .group .button {
		background: #1161ee;
	}
	.login-form .group label .icon {
		width: 15px;
		height: 15px;
		border-radius: 2px;
		position: relative;
		display: inline-block;
		background: rgba(255, 255, 255, 0.1);
	}
	.login-form .group label .icon:before,
	.login-form .group label .icon:after {
		content: '';
		width: 10px;
		height: 2px;
		background: #fff;
		position: absolute;
		-webkit-transition: all 0.2s ease-in-out 0s;
		transition: all 0.2s ease-in-out 0s;
	}
	.login-form .group label .icon:before {
		left: 3px;
		width: 5px;
		bottom: 6px;
		-webkit-transform: scale(0) rotate(0);
		transform: scale(0) rotate(0);
	}
	.login-form .group label .icon:after {
		top: 6px;
		right: 0;
		-webkit-transform: scale(0) rotate(0);
		transform: scale(0) rotate(0);
	}
	.login-form .group .check:checked + label {
		color: #fff;
	}
	.login-form .group .check:checked + label .icon {
		background: #1161ee;
	}
	.login-form .group .check:checked + label .icon:before {
		-webkit-transform: scale(1) rotate(45deg);
		transform: scale(1) rotate(45deg);
	}
	.login-form .group .check:checked + label .icon:after {
		-webkit-transform: scale(1) rotate(-45deg);
		transform: scale(1) rotate(-45deg);
	}
	.login-html .sign-in:checked + .tab + .for-pwd + .tab + .login-form .sign-in-htm {
		-webkit-transform: rotate(0);
		transform: rotate(0);
	}
	.login-html .for-pwd:checked + .tab + .login-form .for-pwd-htm {
		-webkit-transform: rotate(0);
		transform: rotate(0);
	}

	.hr {
		height: 2px;
		margin: 60px 0 50px 0;
		background: rgba(255, 255, 255, 0.2);
	}
	.foot-lnk {
		text-align: center;
	}
</style>
