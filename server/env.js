import dotenv from "dotenv";
dotenv.config({ path: "../.env.public" });

const {
  EXPRESS_SERVER_HOST,
  EXPRESS_SERVER_PORT,
  MONGO_HOST,
  MONGO_PORT,
  MONGO_INITDB_ROOT_USERNAME,
  MONGO_INITDB_ROOT_PASSWORD,
  COOKIE_SECRET,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;

const expressOptions = {
  host: EXPRESS_SERVER_HOST,
  port: EXPRESS_SERVER_PORT || 3000,
  cookieSecret: COOKIE_SECRET,
  jwtSecret: JWT_SECRET,
  jwtExpiresIn: JWT_EXPIRES_IN,
};

const mongoOptions = {
  host: MONGO_HOST,
  port: MONGO_PORT || 27017,
  username: MONGO_INITDB_ROOT_USERNAME,
  password: MONGO_INITDB_ROOT_PASSWORD,
};

export { expressOptions, mongoOptions };
