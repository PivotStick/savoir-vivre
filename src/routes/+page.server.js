import { db } from "$lib/db";
import { fail, redirect } from "@sveltejs/kit";
import { z } from "zod";

const schema = z.object({
	name: z.string().trim().nonempty("Ce champ est requis"),
	referent: z.string().trim().nonempty("Ce champ est requis")
});

/** @type {import('./$types').Actions} */
export const actions = {
	async default({ request }) {
		const data = await request.formData();

		const payload = schema.safeParse({
			name: data.get("name")?.toString(),
			referent: data.get("referent")?.toString()
		});

		if (!payload.success) {
			return fail(400, { errors: payload.error.flatten().fieldErrors });
		}

		const result = await db.bookings.insertOne({
			...payload.data,
			createdAt: Date.now(),
			orders: []
		});

		throw redirect(302, `/bookings/${result.insertedId}`);
	}
};
