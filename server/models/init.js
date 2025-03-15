import { mongoose } from "./index.js";
import { RoleSchema } from "./role.js";
import { UserSchema } from "./user.js";

export const Role = mongoose.model("Role", RoleSchema);
export const User = mongoose.model("User", UserSchema);

export default mongoose;
