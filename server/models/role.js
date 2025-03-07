import { mongoose, Schema } from "./index.js";

const RoleSchema = new Schema({
  role: { type: String, required: true, unique: true, default: "user" },
});

const Role = mongoose.model("Role", RoleSchema);

export { Role };
