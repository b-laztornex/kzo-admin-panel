export async function load({ cookies }) {
	const language = cookies.get('language');

	return {
		language: language?.toLowerCase()
	};
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email');
		const password = form.get('password');

		if (email === '' || password === '') {
			return { code: 1, message: 'data should not be empty' };
		}

		const api_url = import.meta.env.VITE_API_DEV_URL;

		if (api_url == undefined) {
			return { code: 1, message: 'API_URL_NOT_SET' };
		}

		try {
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
				return { code: 0, message: message };
			} else {
				const { detail } = body;
				return { code: 1, message: detail };
			}
		} catch (error) {
			return { code: 1, message: 'UNPROCESSABLE_REQUEST' };
		}
	}
};
