// --------------------------------------DB_MODELS_CONFIG
const { mongoose } = require('./db.js');
const Schema = mongoose.Schema;

// --------------------------------------SCHEMA
const UserSchema = new Schema(
	{
		username: { type: String, required: true, unique: true, match: [/^[a-zA-Z]{3,100}$/, 'Username must be between 3 and 100 characters and only ENG letters!'] },
		password: { type: String, required: true, match: [/^.{8,}$/, 'Password must be at least 8 characters and contain at least one number and one letter!'] },
		role: { type: Schema.Types.ObjectId, ref: 'Role', required: true },
	},
	{ versionKey: false }
);

const RoleSchema = new Schema(
	{
		role: { type: String, required: true, unique: true, default: 'user' },
	},
	{
		versionKey: false,
	}
);

// --------------------------------------MODELS
const User = mongoose.model('User', UserSchema);
const Role = mongoose.model('Role', RoleSchema);

// --------------------------------------EXPORT
module.exports = { User, Role };
