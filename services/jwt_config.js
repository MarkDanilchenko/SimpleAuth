// --------------------------------------JWT_CONFIG(SECRET_KEY_FOR_JWT_COMPARISON)
module.exports = {
	secret_key: Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2) + Math.random().toString(36).substring(2),
};
