export const load = async ({ fetch }) => {
	/**
	 * @type {Menu}
	 */
	const menu = await fetch("/api/menu").then((res) => res.json());

	return { menu };
};
