import { db } from "$lib/db.js";
import { redirect } from "@sveltejs/kit";
import { ObjectId } from "mongodb";
import { z } from "zod";

export const ssr = false;

export const load = async ({ fetch, params }) => {
	/**
	 * @type {Menu}
	 */
	const menu = await fetch("/api/menu").then((res) => res.json());
	const booking = await db.bookings.findOne({ _id: new ObjectId(params.id) });

	if (!booking) throw redirect(302, "/");

	return {
		menu,
		booking: {
			...booking,
			// _id is a non-POJOS object
			_id: undefined
		}
	};
};

export const actions = {
	async saveChoices({ request, params }) {
		const body = await request.json();
		const schema = z.object({
			username: z.string().nonempty(),
			items: z.array(z.string())
		});

		const parsed = schema.parse(body);
		const filter = { _id: new ObjectId(params.id) };
		const booking = await db.bookings.findOne(filter);

		if (!booking) throw new Error("Booking not found");

		const orderIndex = booking.orders.findIndex((o) => o.username === parsed.username);

		if (!parsed.items.length) {
			return await db.bookings.updateOne(filter, {
				$pull: {
					orders: { username: parsed.username }
				}
			});
		}

		return await db.bookings.updateOne(
			filter,
			orderIndex === -1
				? {
						$push: { orders: parsed }
				  }
				: {
						$set: {
							[`orders.${orderIndex}`]: parsed
						}
				  }
		);
	}
};
