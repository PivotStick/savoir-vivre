import { z } from "zod";
import { sign } from "jsonwebtoken";
import { db } from "../../api/db.js";
import { crypto } from "$lib/crypto.js";
import { env } from "$env/dynamic/private";
import { fail, redirect } from "@sveltejs/kit";

const schema = z.object({
	identifier: z.string().trim().nonempty("required"),
	password: z.string().nonempty("required")
});

export const actions = {
	default: async (event) => {
		/** @type {*} */
		const payload = {};
		const formData = await event.request.formData();
		formData.forEach((value, key) => {
			payload[key] = value;
		});

		const results = schema.safeParse(payload);

		if (!results.success) {
			return fail(400, results.error.flatten().fieldErrors);
		}

		const user = await db.users.findOne({ identifier: payload.identifier });

		if (!user) {
			return fail(400, { identifier: ["not_found"] });
		}

		const valid = crypto.comparePassword(payload.password, user.password);

		if (!valid) {
			return fail(400, { password: ["wrong"] });
		}

		event.cookies.set("jwt", sign({ id: user._id }, env.JWT_SECRET));

		throw redirect(302, "/admin");
	}
};
