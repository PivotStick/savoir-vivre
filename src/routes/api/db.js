import { env } from "$env/dynamic/private";
import { MongoClient } from "mongodb";

const client = new MongoClient(env.MONGO_URI);
const database = client.db("savoir-vivre");

export const db = {
	/**
	 * @type {import("mongodb").Collection<Menu>}
	 */
	menus: database.collection("menus"),

	/**
	 * @type {import("mongodb").Collection<User>}
	 */
	users: database.collection("users")
};
