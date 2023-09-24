import mongoose from "mongoose";
import VacationModel, {
  VacationDoc,
  VacationSchema,
} from "../3-models/vacation-model";

export default class VacationService {
  private vacationModelMongo;
  constructor() {
    this.vacationModelMongo = mongoose.model<VacationDoc>(
      "Vacation",
      VacationSchema,
      "Vacations"
    );
  }
  public getAllVacations = async (): Promise<VacationModel[]> => {
    return await this.vacationModelMongo.find();
  };

  public async getFavorites(ids: string[]): Promise<VacationModel[]> {
    const objIds = [];
    ids.forEach((id) => {
      objIds.push(new mongoose.Types.ObjectId(id));
    });
    return await this.vacationModelMongo.find().where("_id").in(objIds).exec();
  }

  //Add new vacation
  public async addVacation(vacation: VacationModel): Promise<any> {
    return await this.vacationModelMongo.insertMany(vacation);
  }

  // Update a vacation by ID
  public updateVacationById = async (
    vacationId: string,
    vacation: VacationModel
  ) => {
    return await this.vacationModelMongo.findByIdAndUpdate(
      vacationId,
      vacation,
      {
        new: true,
      }
    );
  };
  public getVacationById = async (vacationId: string) => {
    return await this.vacationModelMongo.findById(vacationId);
  };

  // Delete a vacation by ID
  public deleteVacationById = async (vacationId: string) => {
    return await this.vacationModelMongo.findByIdAndRemove(vacationId);
  };
}
