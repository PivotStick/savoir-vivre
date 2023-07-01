import { writable } from "svelte/store";

export const nav = writable([
	{
		href: "/",
		icon: "fa-newspaper"
	}
]);
