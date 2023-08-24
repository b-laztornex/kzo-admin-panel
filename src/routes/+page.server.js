export async function load({ cookies }) {
	const language = cookies.get('language');

	return {
		language: language?.toLowerCase()
	};
}
