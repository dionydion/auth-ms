import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  first_name: { type: String, required: [true, "first name not provided"] },
  last_name: { type: String, required: [true, "last name not provided"] },
  email: {
    type: String,
    unique: [true, "email already exists in database!"],
    required: [true, "email not provided"],
  },
  passwordHash: { type: String },
  passwordSalt: { type: String },
  role: {
    type: String,
    enum: ["normal", "admin"],
    required: [true, "Please specify user role"],
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("UserModel", userSchema);
