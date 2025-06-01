import { Document } from "mongoose";

export interface User extends Document {
  email: string;
  password: string;
  role: "user" | "admin";
  username: string;
}

export interface DecodedToken {
  userId: string;
}
