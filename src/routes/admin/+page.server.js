import { db } from "$lib/db";

export const load = async () => {
	const from = new Date();
	from.setHours(0, 0, 0, 0);
	const to = new Date(from);
	to.setHours(23);

	const bookings = await db.bookings
		.find({
			createdAt: {
				$gt: from.getTime(),
				$lt: to.getTime()
			}
		})
		.toArray();

	const menu = await db.menus.findOne();

	// @ts-ignore
	menu._id = menu._id.toJSON();
	// @ts-ignore
	bookings.forEach((b) => (b._id = b._id.toJSON()));

	if (!menu) throw new Error("no menu");

	return {
		menu: menu,
		bookings: bookings
	};
};
