import { redirect } from '@sveltejs/kit';

const unProtectedRoutes = ['/', '/login'];

export const handle = async ({ event, resolve }) => {
	const token = event.cookies.get('token');

	if (!token && !unProtectedRoutes.includes(event.url.pathname)) {
		throw redirect(303, '/');
	}

	const query = event.url.searchParams.get('signout');

	if (Boolean(query) == true) {
		await event.cookies.set('token', '', { path: '/', maxAge: 0 });
		throw redirect(303, '/login');
	}

	return resolve(event);
};
