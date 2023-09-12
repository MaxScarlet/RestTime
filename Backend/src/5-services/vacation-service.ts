import VacationModel, {
  VacationDoc,
  VacationSchema,
} from "../3-models/vacation-model";
import mongoose from "mongoose";
import CredentialsModel from "../3-models/credential-model";
import mongo from "../2-utils/mongo-dal";

const mongoDb = mongo.connect();
// Create and export the Vacation Model of Mongo
const VacationModelMongo = mongoose.model<VacationDoc>(
  "Vacation",
  VacationSchema,
  "Vacations"
);

const getAllVacations = async (): Promise<VacationModel[]> => {
  return await VacationModelMongo.find();
};

async function getFavorites(ids: string[]): Promise<VacationModel[]> {
  // model.find(
  //   {
  //     _id: {
  //       $in: [
  //         mongoose.Types.ObjectId("4ed3ede8844f0f351100000c"),
  //         mongoose.Types.ObjectId("4ed3f117a844e0471100000d"),
  //         mongoose.Types.ObjectId("4ed3f18132f50c491100000e"),
  //       ],
  //     },
  //   },
  //   function (err, docs) {
  //     console.log(docs);
  //   }
  // );
  const objIds = [];
  ids.forEach((id) => {
    objIds.push(new mongoose.Types.ObjectId(id));
  });
  return await VacationModelMongo.find().where("_id").in(objIds).exec();
}

export default {
  getAllVacations,
  getFavorites,
};
