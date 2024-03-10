import mongoose from "mongoose";
import CredentialsModel from "../3-models/credential-model";
import UserModel, { UserDoc, UserSchema } from "../3-models/user-model";

/**
 * A service class to handle operations related to users.
 */
export default class UserService {
	/**
	 * Constructs a new UserService instance.
	 * @param {mongoose.Model<UserDoc>} modelMongo - The Mongoose model for users.
	 */
	constructor(public modelMongo: mongoose.Model<UserDoc> = mongoose.model<UserDoc>("User", UserSchema, "Users")) {}

	/**
	 * Get all users.
	 * @returns {Promise<UserModel[]>} - A promise that resolves to an array of user objects.
	 */
	public getAllUsers = async (): Promise<UserModel[]> => {
		const users = await this.modelMongo.find();
		return users;
	};

	/**
	 * Get a user by ID.
	 * @param {string} userId - The ID of the user to retrieve.
	 * @returns {Promise<UserModel>} - A promise that resolves to the user object.
	 */
	public getUserById = async (userId: string): Promise<UserModel> => {
		return await this.modelMongo.findById(userId);
	};

	/**
	 * Create a new user.
	 * @param {UserModel} user - The user object to create.
	 * @returns {Promise<UserModel>} - A promise that resolves to the created user object.
	 */
	public createUser = async (user: UserModel): Promise<UserModel> => {
		try {
			const newUser = new this.modelMongo(user);

			const userCreated = await newUser.save();

			return userCreated;
		} catch (error) {
			throw new Error(error.message);
		}
	};

	/**
	 * Login a user using credentials.
	 * @param {CredentialsModel} credentials - The credentials for login.
	 * @returns {Promise<UserModel>} - A promise that resolves to the logged-in user object.
	 */
	public async login(credentials: CredentialsModel): Promise<UserModel> {
		return await this.modelMongo.findOne(credentials);
	}

	/**
	 * Update a user by ID.
	 * @param {string} userId - The ID of the user to update.
	 * @param {UserModel} user - The updated user object.
	 * @returns {Promise<UserModel>} - A promise that resolves to the updated user object.
	 */
	public updateUserById = async (userId: string, user: UserModel): Promise<UserModel> => {
		return await this.modelMongo.findByIdAndUpdate(userId, user, {
			new: true,
		});
	};

	/**
	 * Delete a user by ID.
	 * @param {string} userId - The ID of the user to delete.
	 * @returns {Promise<any>} - A promise that resolves to the deletion result.
	 */
	public deleteUserById = async (userId: string): Promise<any> => {
		return await this.modelMongo.findByIdAndRemove(userId);
	};
}
