import axios from "axios";
import { createContext } from "react";
import CredentialsModel from "../Models/CredentialModel";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";

const mainUrl = appConfig.userUrl;
class UserService {
  public async getAll() {
    const response = await axios.get<UserModel[]>(mainUrl);
    const user = response.data;
    return user;
  }

  public async login(credentials: CredentialsModel) {
    const loginUrl = mainUrl + "login";
    const response = await axios.post<any>(loginUrl, credentials);
    const token = response.data.token;
    // localStorage.setItem("jwt_token", token); // need only for "Remember me"
    return token;
  }

  public async getItem(id: number, fullResp = false) {
    const response = await axios.get<any>(mainUrl + id);
    const user = response.data;

    if (fullResp) {
      const { password, _id, userId, ...rest } = user;
      return rest;
    } else {
      const { password, email, userId, ...rest } = user;
      return rest;
    }
  }

  public async getDbName() {
    const response = await axios.get<any>(appConfig.WebSiteName);
    const dbName = response.data[0];
    return dbName;
  }

  public async signUp(userData: UserModel) {
    const response = await axios.post<any>(mainUrl, userData);
    const user = response.data;
    return user;
  }
}
const userService = new UserService();

export default userService;
