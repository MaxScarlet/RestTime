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
  const objIds = [];
  ids.forEach((id) => {
    objIds.push(new mongoose.Types.ObjectId(id));
  });
  return await VacationModelMongo.find().where("_id").in(objIds).exec();
}

//Add new vacation
async function addVacation(vacation: VacationModel): Promise<any> {
  return await VacationModelMongo.insertMany(vacation);
}

// Update a vacation by ID
const updateVacationById = async (
  vacationId: string,
  vacation: VacationModel
) => {
  return await VacationModelMongo.findByIdAndUpdate(vacationId, vacation, {
    new: true,
  });
};

// Delete a vacation by ID
const deleteVacationById = async (vacationId: string) => {
  return await VacationModelMongo.findByIdAndRemove(vacationId);
};

export default {
  getAllVacations,
  getFavorites,
  deleteVacationById,
  updateVacationById,
  addVacation,
};
