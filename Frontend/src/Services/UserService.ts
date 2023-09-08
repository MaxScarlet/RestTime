import axios from "axios";
import { createContext } from "react";
import CredentialsModel from "../Models/CredentialModel";
import UserModel from "../Models/UserModel";
import appConfig from "../Utils/AppConfig";

class UserService {
  public async getAllUsers() {
    const response = await axios.get<UserModel[]>(appConfig.userUrl);
    const user = response.data;
    return user;
  }

  public async login(credentials: CredentialsModel) {
    const response = await axios.post<UserModel>(
      appConfig.userUrl + "login",
      credentials
    );
    const token = response.data.toString();
    localStorage.setItem("jwt_token", token);
    return token;
  }
  public async getUserInfo(userId: number) {
    const response = await axios.get<UserModel[]>(appConfig.userUrl + userId);
    const user = response.data[0];
    return user;
  }
}
export const isAuth = (): boolean => {
  const token = localStorage.getItem("jwt_token");
  if (token) {
    // const decodedToken: { exp: number } = jwtDecode(token);
    // const currentTime = Date.now() / 1000;
    // return decodedToken.exp > currentTime;
    return true;
  }
  return false;
};
const userService = new UserService();

export default userService;
// function jwtDecode(token: string): { exp: number } {
//   throw new Error("Function not implemented.");
// }
