import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const token = cookies.get('token');
	const api_url = import.meta.env.VITE_API_DEV_URL;

	const headers = { 'Content-Type': 'application/json', Cookie: `token =${token}` };

	const getLanguage = await fetch(`${api_url}/get_language`, {
		method: 'GET',
		headers: headers
	});

	const language = await getLanguage.json();

	const getMotorPosition = await fetch(`${api_url}/get_motor_position`, {
		method: 'GET',
		headers: headers
	});

	const position = await getMotorPosition.json();

	if (getLanguage.status !== 200 || getMotorPosition.status !== 200) {
		await cookies.set('token', '', { path: '/', maxAge: 0 });
		throw redirect(307, '/login');
	}

	var timestamps = position.message.timestamps;
	var motor_positions = position.message.motor_positions;

	var tempData = timestamps.map(function (e, i) {
		return { date: e, position: motor_positions[i] };
	});

	let diferenceTime = [{ date: timestamps[0], position: 0 }];

	for (let i = 0; i < timestamps.length - 1; i++) {
		let diff = new Date(timestamps[i + 1]).getTime() - new Date(timestamps[i]).getTime();
		diferenceTime.push({ date: timestamps[i + 1], position: diff });
	}

	return {
		token: token,
		position: tempData,
		velocity: diferenceTime,
		language: language.message.toLowerCase()
	};
}

export const actions = {
	setln: async ({ cookies, request }) => {
		const token = cookies.get('token');
		const headers = { 'Content-Type': 'application/json', Cookie: `token =${token}` };
		const form = await request.formData();
		const language = form.get('language');

		if (language === '') {
			return { code: 1, message: 'language should not be empty' };
		}

		const api_url = import.meta.env.VITE_API_DEV_URL;

		const response = await fetch(`${api_url}/set_language`, {
			method: 'POST',
			headers: headers,
			body: JSON.stringify({
				language: language?.toUpperCase()
			})
		});

		const body = await response.json();

		if (response.status === 200) {
			const { message, new_language, token } = body;
			return { code: 0, message: message, new_language: new_language };
		} else {
			const { detail } = body;
			return { code: 1, message: detail };
		}
	}
};
