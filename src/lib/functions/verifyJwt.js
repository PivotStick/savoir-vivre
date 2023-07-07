import { env } from "$env/dynamic/private";
import { db } from "$lib/db";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

/**
 * @param {string} token
 */
export const verifyJwt = async (token) => {
	const payload = jwt.verify(token, env.JWT_SECRET);

	if (typeof payload !== "string") {
		return await db.users.findOne({
			_id: new ObjectId(payload.id)
		});
	}

	return null;
};
