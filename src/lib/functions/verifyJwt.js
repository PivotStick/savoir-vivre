import { env } from "$env/dynamic/private";
import { verify } from "jsonwebtoken";
import { db } from "../db";
import { ObjectId } from "mongodb";

/**
 * @param {string} jwt
 */
export const verifyJwt = async (jwt) => {
	const payload = verify(jwt, env.JWT_SECRET);

	if (typeof payload !== "string") {
		return await db.users.findOne({
			_id: new ObjectId(payload.id)
		});
	}

	return null;
};
