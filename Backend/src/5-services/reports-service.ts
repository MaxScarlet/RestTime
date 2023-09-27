import mongoose from "mongoose";
import UserModel, { UserDoc, UserSchema } from "../3-models/user-model";

export default class ReportsService {
  private modelMongo;

  constructor() {
    this.modelMongo = mongoose.model<UserDoc>("User", UserSchema, "Users");
  }
  public getFavorites = async (id: string): Promise<UserModel[]> => {
    const regexPattern = new RegExp(`.*${id}.*`);
    return await this.modelMongo.find({
      favorites: {
        $elemMatch: { $regex: regexPattern, $options: "i" },
      },
    });
  };
  public getAllFavorites = async (): Promise<UserModel[]> => {
    return await this.modelMongo.aggregate([
      {
        $unwind: "$favorites",
      },
      {
        $group: {
          _id: "$favorites",
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
    ]);
  };
}
