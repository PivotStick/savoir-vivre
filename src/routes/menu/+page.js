export const load = async ({ fetch }) => {
	const menu = await fetch("/api/menu").then((res) => res.json());

	return { menu };
};
