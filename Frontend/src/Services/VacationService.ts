import axios from "axios";
import vacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";
import { useAuth } from "../../src/Components/LayoutArea/AuthProvider";

const mainUrl = appConfig.vacationUrl;

class VacationService {
  public async getAll(isAdmin: boolean) {
    const response = await axios.get<vacationModel[]>(mainUrl, {
      headers: {
        "x-resttime-isadmin": `${isAdmin}`, // Set the content type to multipart/form-data
      },
    });
    const item = response.data;
    return item;
  }

  public async getInfo(id: string) {
    const response = await axios.get<any>(mainUrl + id);
    const item = response.data;
    return item;
  }

  public async toggleVacation(id: string) {
    const response = await axios.delete<any>(mainUrl + id);
    return true;
  }

  public async getFavs(ids: string[]) {
    const response = await axios.post<any>(mainUrl + "favorites", ids);
    const items = response.data;
    return items;
  }

  public async editVacation(vacation: vacationModel, id: string) {
    const response = await axios.put<any>(mainUrl + id, vacation, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });
    const items = response.data;
    return items;
  }
  public async addVacation(vacation: vacationModel) {
    const response = await axios.post<any>(mainUrl, vacation, {
      headers: {
        "Content-Type": "multipart/form-data", // Set the content type to multipart/form-data
      },
    });
    const items = response.data;
    return items;
  }
}

const vacationService = new VacationService();

export default vacationService;
