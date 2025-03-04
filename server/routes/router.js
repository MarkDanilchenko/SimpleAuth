// --------------------------------------ROUTER_CONFIG
const router = require('express').Router();
const controller_auth = require('../controllers/controller_auth.js');
const { check } = require('express-validator');
const { jwtCheckExpired } = require('../middlewares/middleware_auth.js');

// --------------------------------------URLS "/api/v1/..."
// http://localhost:3000/api/v1/sign_up
router.route('/sign_up').post(
	[
		check('username', 'Username must be between 3 and 100 characters and only ENG letters!')
			.isLength({ min: 3, max: 100 })
			.custom((value) => {
				return value.match(/^[a-zA-Z]*$/);
			}),
		check('password', 'Password must be at least 8 characters and contain at least one number and one letter!')
			.isLength({ min: 8 })
			.custom((value) => {
				return value.match(/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$/);
			}),
	],
	controller_auth.signUp
);
// http://localhost:3000/api/v1/sign_in
router.route('/sign_in').post(controller_auth.signIn);
// http://localhost:3000/api/v1/profile
router.route('/profile').get([jwtCheckExpired], controller_auth.profile);

// --------------------------------------EXPORT
module.exports = { router };
