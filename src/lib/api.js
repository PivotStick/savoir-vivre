/**
 * @param {string} endpoint
 * @param {string} method
 * @param {*=} body
 */
const request = async (endpoint, method, body) => {
	/**
	 * @type {RequestInit}
	 */
	const init = { method };

	if (method !== "GET" && body) {
		init.headers = { "content-type": "application/json" };
		init.body = JSON.stringify(body);
	}

	const response = await fetch(`/api${endpoint}`, init);
	const json = await response.json();

	if (response.status >= 400) {
		throw json;
	}

	return json;
};

export const api = {
	/**
	 * @param {string} endpoint
	 */
	get(endpoint) {
		return request(endpoint, "GET");
	},

	/**
	 * @param {string} endpoint
	 * @param {*} body
	 */
	post(endpoint, body) {
		return request(endpoint, "POST", body);
	},

	/**
	 * @param {string} endpoint
	 * @param {*} body
	 */
	put(endpoint, body) {
		return request(endpoint, "PUT", body);
	},

	/**
	 * @param {string} endpoint
	 * @param {*} body
	 */
	patch(endpoint, body) {
		return request(endpoint, "PATCH", body);
	},

	/**
	 * @param {string} endpoint
	 * @param {*} body
	 */
	delete(endpoint, body) {
		return request(endpoint, "DELETE", body);
	}
};
