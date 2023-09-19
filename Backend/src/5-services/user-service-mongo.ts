import UserModel, { UserDoc, UserSchema } from "../3-models/user-model";
import mongoose from "mongoose";
import CredentialsModel from "../3-models/credential-model";
import mongo from "../2-utils/mongo-dal";

const mongoDb = mongo.connect();
// Create and export the User Model of Mongo
const UserModelMongo = mongoose.model<UserDoc>("User", UserSchema, "Users");

const getAllUsers = async (): Promise<UserModel[]> => {
  return await UserModelMongo.find();
};

const getUserById = async (userId: string): Promise<UserModel> => {
  return await UserModelMongo.findById(userId);
};

// Create a new user
const createUser = async (user: UserModel): Promise<UserModel> => {
  try {
    const newUser = new UserModelMongo(user);

    // Save the new user to the database
    const userCreated = await newUser.save();

    // Return the created user
    return userCreated;
  } catch (error) {
    throw new Error(error.message);
  }
};
async function login(credentials: CredentialsModel): Promise<UserModel> {
  return await UserModelMongo.findOne(credentials);
}

// Update a user by ID
const updateUserById = async (userId: string, user: UserModel) => {
  return await UserModelMongo.findByIdAndUpdate(userId, user, { new: true });
};

// Delete a user by ID
const deleteUserById = async (userId: string) => {
  return await UserModelMongo.findByIdAndRemove(userId);
};

export default {
  getAllUsers,
  getUserById,
  login,
  createUser,
  updateUserById,
  deleteUserById,
};
