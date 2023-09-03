import axios from "axios";
import appConfig from "../Utils/AppConfig";
import UserModel from "../Models/UserModel";

class UserService {
  public async getAllUsers() {
    const response = await axios.get<UserModel[]>(appConfig.userUrl);
    const audience = response.data;
    return audience;
  }
}

const userService = new UserService();

export default userService;
