import { mongoose, Schema } from "./index.js";

const RoleSchema = new Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin", "moderator", "member", "guest"],
  },
});

const Role = mongoose.model("Role", RoleSchema);

export { Role };
