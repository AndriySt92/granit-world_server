import bcrypt from "bcryptjs";
import mongoose from "mongoose";

import { IUser } from "../types/user.interface";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: [3, "Name must be at least 3 characters"],
    maxlength: [100, "Name must be at least 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: [6, "Password must be at least 6 characters"],
    maxlength: [50, "Password must be at least 50 characters"],
  },
});

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
