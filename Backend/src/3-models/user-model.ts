import { Schema } from "mongoose";
import FavoriteModel from "./favorite-model";

interface UserModel {
  userId: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  isAdmin: boolean;
  favorites: FavoriteModel[];
}
export default UserModel;

export interface UserDoc extends UserModel, Document {}

// Define schema
export const UserSchema: Schema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: false,
  },
  userId: {
    type: Number,
    required: false,
  },
  favorites: {
    type: Array,
    required: true,
  },
});
