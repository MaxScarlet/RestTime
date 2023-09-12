import axios from "axios";
import vacationModel from "../Models/VacationModel";
import appConfig from "../Utils/AppConfig";

const mainUrl = appConfig.vacationUrl;
class VacationService {
  public async getAll() {
    const response = await axios.get<vacationModel[]>(mainUrl);
    const item = response.data;
    return item;
  }

  public async getInfo(userId: string) {
    const response = await axios.get<any>(mainUrl + userId);
    const item = response.data;
    return item;
  }

  public async getFavs(ids: string[]) {
    const response = await axios.post<any>(mainUrl + "favorites", ids);
    const items = response.data;
    return items;
  }
}

const vacationService = new VacationService();

export default vacationService;
