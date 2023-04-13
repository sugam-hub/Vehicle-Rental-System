const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, unique: true, require: true },
    password: { type: String, require: true },
    confirmPassword: { type: String, require: true },
    isSuperAdmin: { type: Boolean, default: false },
    isBusinessOwner: { type: String, require: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
