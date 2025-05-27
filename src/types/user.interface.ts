import { Document } from "mongoose";

export interface IUser extends Document {
  _id: string;
  email: string;
  password: string;
}

export interface IDecodedToken {
  userId: string;
}
