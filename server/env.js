import dotenv from "dotenv";
dotenv.config({ path: "../.env.development" });

const {
  EXPRESS_SERVER_HOST,
  EXPRESS_SERVER_PORT,
  MONGO_HOST,
  MONGO_OUTER_PORT,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  COOKIE_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

const expressOptions = {
  host: EXPRESS_SERVER_HOST || "127.0.0.1",
  port: EXPRESS_SERVER_PORT || 3000,
  cookieSecret: COOKIE_SECRET,
  jwtSecret: JWT_SECRET,
  jwtExpiresIn: JWT_EXPIRES_IN,
};

const mongoOptions = {
  host: MONGO_HOST || "127.0.0.1",
  outerPort: MONGO_OUTER_PORT || 27017,
  username: MONGO_INITDB_ROOT_USERNAME,
  password: MONGO_INITDB_ROOT_PASSWORD,
};

export { expressOptions, mongoOptions };
