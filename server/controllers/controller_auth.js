// --------------------------------------CONTROLLER_AUTH_CONFIG
const { User, Role } = require('../models/models.js');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwt_secretKey = require('../services/jwt_config.js').secret_key;

// --------------------------------------JWT_IMPLEMENTATION_WITH_PAYLOAD
function generateAccessToken(id, role) {
	const payload = {
		id,
		role,
	};
	return jwt.sign(payload, jwt_secretKey, { expiresIn: '24h' });
}

// --------------------------------------CONTROLLER_AUTH
class authController {
	async signUp(req, res) {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				res.status(400);
				res.send(JSON.stringify({ error: errors.array()[0].msg }));
				res.end();
				return;
			}
			const username = req.body.username;
			const password = req.body.password;
			const userExist = await User.findOne({ username: username });
			if (userExist) {
				res.status(400);
				res.send(JSON.stringify({ error: 'User with this username is already exists!' }));
				res.end();
			} else {
				const hashPassword = bcryptjs.hashSync(password, 10);
				const role = await Role.findOne({ role: 'user' });
				const user = await User.create({ username: username, password: hashPassword, role: role });
				res.status(200);
				res.json(`User "${user.username}" was successfully created!`);
				res.end();
			}
		} catch (error) {
			console.log(error);
			res.status(400);
			res.send(JSON.stringify({ error: 'SignUp error! Please, try again.' }));
			res.end();
		}
	}

	async signIn(req, res) {
		try {
			const username = req.body.username;
			const password = req.body.password;
			const userRegistered = await User.findOne({ username: username });
			if (!userRegistered) {
				res.status(400);
				res.send(JSON.stringify({ error: 'User with this username not found!' }));
				res.end();
			} else {
				const checkPassword = bcryptjs.compareSync(password, userRegistered.password);
				if (checkPassword) {
					// JWT IMPLEMENTATION
					const token = generateAccessToken(userRegistered._id, userRegistered.role);
					res.status(200);
					res.send(JSON.stringify({ token: token }));
					res.end();
				} else {
					res.status(400);
					res.send(JSON.stringify({ error: 'Incorrect password!' }));
					res.end();
				}
			}
		} catch (error) {
			console.log(error);
			res.status(400);
			res.send(JSON.stringify({ error: 'SignIn error! Please, try again.' }));
			res.end();
		}
	}

    // PROFILE_INFO_FOR_ADMIN_ROLE_ONLY
	async profile(req, res) {
		try {
			if (req.jwt.role === await Role.findOne({ role: 'admin' }).then((role) => String(role._id))) {
				let users = await User.find({}, '-password');
				res.status(200);
				res.send(JSON.stringify({ users: users }));
				res.end();
			} else {
				res.status(403);
				res.send(JSON.stringify({ error: 'Access denied!\nThis information is for Admins only!' }));
				res.end();
			}
		} catch (error) {
			console.log(error);
			res.status(400);
			res.send(JSON.stringify({ error: error.message }));
			res.end();
		}
	}
}

// --------------------------------------EXPORT
module.exports = new authController();
