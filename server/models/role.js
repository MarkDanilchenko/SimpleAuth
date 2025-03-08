import { mongoose, Schema } from "./index.js";

const RoleSchema = new Schema({
  role: {
    type: String,
    required: true,
    unique: true,
    enum: ["admin", "moderator", "member", "guest"],
    default: "guest",
  },
});

const Role = mongoose.model("Role", RoleSchema);

export { Role };
