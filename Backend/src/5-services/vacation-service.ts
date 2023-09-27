import mongoose from "mongoose";
import VacationModel, {
  VacationDoc,
  VacationSchema,
} from "../3-models/vacation-model";
import imageHelper from "../2-utils/image-handle";

export default class VacationService {
  private modelMongo;
  constructor() {
    this.modelMongo = mongoose.model<VacationDoc>(
      "Vacation",
      VacationSchema,
      "Vacations"
    );
  }
  public getAllVacations = async (): Promise<VacationModel[]> => {
    return await this.modelMongo.find();
  };

  public async getFavorites(ids: string[]): Promise<VacationModel[]> {
    const objIds = [];
    ids.forEach((id) => {
      objIds.push(new mongoose.Types.ObjectId(id));
    });
    return await this.modelMongo.find().where("_id").in(objIds).exec();
  }

  //Add new vacation
  public async addVacation(vacation: VacationModel): Promise<any> {
    const response = await this.modelMongo.insertMany(vacation);
    const imageName = vacation.picture
      ? await imageHelper.saveImage(
          vacation.picture,
          response[0]._id.toString()
        )
      : "";
    return response;
  }

  // Update a vacation by ID
  public updateVacationById = async (
    vacationId: string,
    vacation: VacationModel
  ) => {
    const imageName = vacation.picture
      ? await imageHelper.saveImage(vacation.picture, vacationId)
      : "";
    vacation.picturePath = "";
    return await this.modelMongo.findByIdAndUpdate(
      vacationId,
      vacation,
      {
        new: true,
      }
    );
  };
  public getVacationById = async (vacationId: string) => {
    return await this.modelMongo.findById(vacationId);
  };

  // Delete a vacation by ID
  public deleteVacationById = async (vacationId: string) => {
    return await this.modelMongo.findByIdAndRemove(vacationId);
  };
}
