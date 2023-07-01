import c from "crypto";

const separator = "°";

export const crypto = {
	/**
	 * @param {string} password
	 */
	cryptPassword: (password) => {
		const salt = c.randomBytes(16).toString("hex");
		const hash = c.pbkdf2Sync(password, salt, 1000, 64, "sha512").toString("hex");

		return `${salt}${separator}${hash}`;
	},

	/**
	 * @param {string} plainPass
	 * @param {string} hashword
	 */
	comparePassword: (plainPass, hashword) => {
		const [salt, toCompare] = hashword.split(separator);
		const hash = c.pbkdf2Sync(plainPass, salt, 1000, 64, "sha512").toString("hex");

		return hash === toCompare;
	}
};
