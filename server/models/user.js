import { Schema } from "./index.js";

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String },
  lastName: { type: String },
  age: { type: Number, required: true, min: 1, max: 120 },
  password: { type: String, required: true },
  roleId: { type: Schema.Types.ObjectId, ref: "Role", required: true },
});

export { UserSchema };
