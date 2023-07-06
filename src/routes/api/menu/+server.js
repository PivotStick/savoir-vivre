import { db } from "$lib/db.js";
import { json } from "@sveltejs/kit";

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

	await db.bookings.deleteMany();

	return json(result);
};
