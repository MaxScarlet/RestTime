import mongoose from "mongoose";
import CredentialsModel from "../3-models/credential-model";
import UserModel, { UserDoc, UserSchema } from "../3-models/user-model";

export default class UserService {
  private modelMongo;

  constructor() {
    this.modelMongo = mongoose.model<UserDoc>("User", UserSchema, "Users");
  }

  public getAllUsers = async (): Promise<UserModel[]> => {
    return await this.modelMongo.find();
  };

  public getUserById = async (userId: string): Promise<UserModel> => {
    return await this.modelMongo.findById(userId);
  };

  // Create a new user
  public createUser = async (user: UserModel): Promise<UserModel> => {
    try {
      const newUser = new this.modelMongo(user);

      // Save the new user to the database
      const userCreated = await newUser.save();

      // Return the created user
      return userCreated;
    } catch (error) {
      throw new Error(error.message);
    }
  };
  public async login(credentials: CredentialsModel): Promise<UserModel> {
    return await this.modelMongo.findOne(credentials);
  }

  // Update a user by ID
  public updateUserById = async (userId: string, user: UserModel) => {
    return await this.modelMongo.findByIdAndUpdate(userId, user, {
      new: true,
    });
  };

  // Delete a user by ID
  public deleteUserById = async (userId: string) => {
    return await this.modelMongo.findByIdAndRemove(userId);
  };
}
