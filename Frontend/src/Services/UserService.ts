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
    const user = response.data;
    return user;
  }
}

const userService = new UserService();

export default userService;
