import { redirect } from '@sveltejs/kit';

export async function load({ cookies }) {
	const token = cookies.get('token');
	const api_url = import.meta.env.VITE_API_DEV_URL;

	const headers = { 'Content-Type': 'application/json', Cookie: `token =${token}` };

	const getLanguage = await fetch(`${api_url}/get_language`, {
		method: 'GET',
		headers: headers
	});

	const responseLanguage = await getLanguage.json();

	if (getLanguage.status !== 200) {
		await cookies.set('token', '', { path: '/', maxAge: 0 });
		throw redirect(307, '/login');
	}

	const getMotorPosition = await fetch(`${api_url}/get_motor_position`, {
		method: 'GET',
		headers: headers
	});

	const responseMotorposition = await getMotorPosition.json();

	if (getMotorPosition.status !== 200) {
		await cookies.set('token', '', { path: '/', maxAge: 0 });
		throw redirect(307, '/login');
	}

	let timestamps = responseMotorposition.message.timestamps;
	let motor_positions = responseMotorposition.message.motor_positions;
	let motor_velocity = [0];
	let motor_distance = [0];

	for (let i = 0; i < timestamps.length - 1; i++) {
		// Difference between 2 dates in ms
		let timeDiff = new Date(timestamps[i + 1]).getTime() - new Date(timestamps[i]).getTime();

		// Calculation of the velocity based in the postition and time difference
		let velocity = motor_positions[i] / timeDiff;

		let distance = velocity * new Date(timestamps[i]).getTime();

		motor_velocity.push(velocity);
		motor_distance.push(timeDiff);
	}

	return {
		token: token,
		timestamps: timestamps,
		motor_positions: motor_positions,
		motor_velocity: motor_velocity,
		motor_distance: motor_distance,
		max_position: Math.max(...motor_positions),
		max_velocity: Math.max(...motor_velocity),
		max_distances: Math.max(...motor_distance),
		language: responseLanguage.message.toLowerCase()
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
			cookies.set('language', new_language, {
				path: '/',
				maxAge: 60 * 60 * 24 * 1000
			});
			return { code: 0, message: message, new_language: new_language };
		} else {
			const { detail } = body;
			return { code: 1, message: detail };
		}
	}
};
