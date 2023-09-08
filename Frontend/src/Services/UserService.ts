import axios from "axios";
import appConfig from "../Utils/AppConfig";
import UserModel from "../Models/UserModel";
import CredentialsModel from "../Models/CredentialModel";

class UserService {
  public async getAllUsers() {
    const response = await axios.get<UserModel[]>(appConfig.userUrl);
    const audience = response.data;
    return audience;
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
