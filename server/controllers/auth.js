import { User } from "../models/init.js";
import { Role } from "../models/init.js";
import crypto from "crypto";
import { badRequestError, notFoundError, unauthorizedError } from "../utils/errors.js";
import jwt from "jsonwebtoken";
import { expressOptions } from "../env.js";

class AuthController {
  async signUp(req, res) {
    const { username, firstName, lastName, age, password, roleName } = req.body;

    const isUserExists = await User.exists({ username });
    if (isUserExists) {
      return badRequestError(res, "User already exists!");
    }

    let roleInstance = await Role.findOne({ role: roleName });
    if (!roleInstance) {
      roleInstance = await Role.create({ role: roleName });
    }

    try {
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      await User.create({
        username,
        firstName,
        lastName,
        age,
        password: hashedPassword,
        roleId: roleInstance._id,
      });

      res.status(201);
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }

  async signIn(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return notFoundError(res, "User not found!");
    }

    const checkPassword = crypto.createHash("sha256").update(password).digest("hex") === user.password;
    if (!checkPassword) {
      return unauthorizedError(res, "Wrong password!");
    }

    const accessToken = jwt.sign({ userId: user._id, roleId: user.roleId }, expressOptions.jwtSecret, {
      expiresIn: `${expressOptions.jwtExpiresIn}`,
    });

    res.status(200);
    res.send(JSON.stringify({ accessToken }));
    res.end();
  }

  async profile(req, res) {
    const { userId, roleId } = jwt.decode(req.headers.authorization.split(" ")[1]);
    const anotherUserId = req.body.anotherUserId; // anotherUserId is id of another user that you want to get profile as admin;

    let profile;

    const role = await Role.findById(roleId);
    if (!role) {
      return notFoundError(res, "Role not found!");
    }

    try {
      if (role.role === "admin" && anotherUserId) {
        profile = await User.findById(anotherUserId).populate("roleId");
        if (!profile) {
          return notFoundError(res, "User not found!");
        }
      } else {
        profile = await User.findById(userId).populate("roleId");
      }
      profile.password = undefined;

      res.status(200);
      res.send(JSON.stringify({ profile }));
      res.end();
    } catch (error) {
      badRequestError(res, error.message);
    }
  }
}

const authController = new AuthController();

export { authController };
