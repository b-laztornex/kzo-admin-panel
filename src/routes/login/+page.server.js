import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		if (email === '' || password === '') {
			return { message: 'data should not be empty' };
		}

		const api_url = import.meta.env.VITE_API_DEV_URL;

		const response = await fetch(`${api_url}/login`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				username: email,
				password: password
			})
		});

		const body = await response.json();

		if (response.status === 200) {
			const { message, token } = body;

			cookies.set('token', token, {
				path: '/',
				maxAge: 60 * 60 * 24 * 1000
			});

			throw redirect(302, '/dashboard');
		} else {
			const { detail } = body;

			return fail(400, { email, incorrect: true });
		}
	}
};
