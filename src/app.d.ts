// See https://kit.svelte.dev/docs/types#app

import type { WithId } from "mongodb";

// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user?: Pick<User, "identifier" | "roles">;
		}
		// interface PageData {}
		// interface Platform {}
	}
}

export {};
