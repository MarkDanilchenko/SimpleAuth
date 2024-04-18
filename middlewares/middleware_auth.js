// --------------------------------------MIDDLEWARE_AUTH_CONFIG
const jwt = require('jsonwebtoken');
const jwt_secretKey = require('../services/jwt_config.js').secret_key;

// --------------------------------------JWT_CHECK_EXPIRED
function jwtCheckExpired(req, res, next) {
	try {
		const token = req.headers.authorization ? req.headers.authorization.split(' ')[1] : null;
		if (!token) {
			res.status(401).send('User is not sign in!');
			res.end();
		} else {
			const decoded = jwt.verify(token, jwt_secretKey);
			req.jwt = decoded;
			next();
		}
	} catch (error) {
		console.log(error);
		res.status(401).send('User is not sign in!');
		res.end();
	}
}

// --------------------------------------EXPORT
module.exports = { jwtCheckExpired };
