import { User } from "../models/user";
import { Role } from "../models/role";
import crypto from "crypto";
import { badRequestError, notFoundError, unauthorizedError } from "../utils/errors";
import jwt from "jsonwebtoken";
import { expressOptions } from "../env";

class AuthController {
  async signUp(req, res) {
    const { username, firstName, lastName, age, password, role } = req.body;

    const isUserExist = await User.exists({ username });
    if (isUserExist) {
      badRequestError(res, "User with this username already exist!");
    }

    const roleId = await Role.exists({ role });
    if (!roleId) {
      notFoundError(res, "Role not found!");
    }

    try {
      const hashedPassword = crypto.createHash("sha256").update(password).digest("hex");

      await User.create({
        username,
        firstName,
        lastName,
        age,
        password: hashedPassword,
        role: roleId,
      });

      res.status(201);
      res.end();
    } catch (error) {
      res.status(400);
      res.send(JSON.stringify({ error: error.message }));
      res.end();
    }
  }

  async signIn(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      notFoundError(res, "User with this username not found!");
    }

    const checkPassword = crypto.createHash("sha256").update(password).digest("hex") === user.password;
    if (!checkPassword) {
      unauthorizedError(res, "Wrong password!");
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
    const anotherUserId = req.body.userId; // This is a userId of another user that you want to get profile as admin;

    let profile;

    const role = await Role.findById(roleId);
    if (!role) {
      notFoundError(res, "Role not found!");
    }

    if (role.role === "admin" && anotherUserId) {
      profile = await User.findById(anotherUserId);
    } else {
      profile = await User.findById(userId);
    }
    profile.password = undefined;
    profile.role = role;

    res.status(200);
    res.send(JSON.stringify({ profile }));
    res.end();
  }
}

const authController = new AuthController();

export default authController;
