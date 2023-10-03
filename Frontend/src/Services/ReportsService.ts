/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import vacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { useAuth } from "../Components/LayoutArea/AuthProvider";

const mainUrl = appConfig.reportsUrl;

class ReportsService {
  public async getAll() {
    const response = await axios.get<vacationModel[]>(
      mainUrl + "/vacations/favorites"
    );
    const item = response.data;
    return item;
  }

  public async getInfo(vacationId: string) {
    const response = await axios.get<number>(
      mainUrl + "/vacations/" + vacationId + "/favorites"
    );
    const item = response.data;
    return item;
  }
}

const reportsService = new ReportsService();

export default reportsService;
