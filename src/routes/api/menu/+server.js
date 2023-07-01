import { json } from "@sveltejs/kit";
import { db } from "../db.js";

export const GET = async () => {
	let menu = await db.menus.findOne();

	if (!menu) {
		await db.menus.insertOne({
			categories: [
				{ name: "Entrée", items: [] },
				{ name: "Plats", items: [] },
				{ name: "Desserts", items: [] }
			]
		});

		menu = await db.menus.findOne();
	}

	return json(menu);
};

export const PUT = async ({ request }) => {
	const body = await request.json();
	const result = await db.menus.updateOne({}, { $set: { categories: body } });

	return json(result);
};

export const PATCH = async ({ request }) => {
	/**
	 * @type {{ name: string; orders: `${string}.${string}`[] }}
	 */
	const { name, orders } = await request.json();

	const menu = await db.menus.findOne();
	if (!menu) throw new Error("No menu");

	menu.categories.forEach((category) => {
		category.items.forEach((item) => {
			item.orders = item.orders.filter((o) => o !== name);
		});
	});

	orders.forEach((order) => {
		const [categoryName, itemName] = order.split(".");

		const item = menu.categories
			.find((c) => c.name === categoryName)
			?.items.find((i) => i.name === itemName);

		if (item) {
			item.orders.push(name);
		}
	});

	const results = await db.menus.updateOne(
		{ _id: menu._id },
		{ $set: { categories: menu.categories } }
	);

	return json(results);
};
