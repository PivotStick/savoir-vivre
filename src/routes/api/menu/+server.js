import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { MongoClient } from "mongodb";

const client = new MongoClient(env.MONGO_URI);
const db = client.db("savoir-vivre");

/**
 * @type {import("mongodb").Collection<Menu>}
 */
const menuCollection = db.collection("menu");

export const GET = async () => {
	let menu = await menuCollection.findOne();

	if (!menu) {
		await menuCollection.insertOne({
			categories: [
				{ name: "Entrée", items: [] },
				{ name: "Plats", items: [] },
				{ name: "Desserts", items: [] }
			]
		});

		menu = await menuCollection.findOne();
	}

	return json(menu);
};

export const PUT = async ({ request }) => {
	const body = await request.json();
	const result = await menuCollection.updateOne({}, { $set: { categories: body } });

	return json(result);
};

export const PATCH = async ({ request }) => {
	/**
	 * @type {{ name: string; orders: `${string}.${string}`[] }}
	 */
	const { name, orders } = await request.json();

	const menu = await menuCollection.findOne();
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

	const results = await menuCollection.updateOne(
		{ _id: menu._id },
		{ $set: { categories: menu.categories } }
	);

	return json(results);
};
