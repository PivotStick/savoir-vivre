import { verifyJwt } from "$lib/functions/verifyJwt";

export const handle = async ({ event, resolve }) => {
	if (event.url.pathname.startsWith("/admin") && event.url.pathname !== "/admin/auth") {
		const jwt = event.cookies.get("jwt");

		if (jwt) {
			const user = await verifyJwt(jwt);

			if (user) {
				event.locals.user = {
					identifier: user.identifier,
					roles: user.roles
				};

				return resolve(event);
			}
		}

		return Response.redirect(`${event.url.origin}/admin/auth`, 302);
	}

	return resolve(event);
};
