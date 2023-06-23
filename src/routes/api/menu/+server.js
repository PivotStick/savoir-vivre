import { env } from "$env/dynamic/private";
import { json } from "@sveltejs/kit";
import { MongoClient } from "mongodb";

const client = new MongoClient(env.MONGO_URI);
const db = client.db("savoir-vivre");

const menuCollection = db.collection("menu");

export const GET = async () => {
	const menu = await menuCollection.findOne();
	return json(menu);
};

export const PUT = async ({ request }) => {
	const body = await request.json();
	const result = await menuCollection.updateOne({}, { $set: { categories: body } });

	return json(result);
};
