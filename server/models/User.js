const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    phone: { type: Number, require: true },
    address: { type: String, require: true },
    confirmPassword: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
