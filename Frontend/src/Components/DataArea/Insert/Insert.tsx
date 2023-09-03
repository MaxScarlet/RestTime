import { useNavigate } from "react-router-dom";
import "./Insert.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import notifyService from "../../../Services/NotifyService";
import userService from "../../../Services/UserService";
import CredentialsModel from "../../../Models/CredentialModel";

function Insert(): JSX.Element {
  const { register, handleSubmit, formState } = useForm<UserModel>();

  const navigate = useNavigate();

  async function sendUser(credentials: CredentialsModel) {
    try {
      const res = await userService.login(credentials);
      //notifyService.success("Logged In Successfully");
      navigate("/home");
    } catch (error) {
      notifyService.error(error);
    }
  }

  return (
    <div className="container">
      <form onSubmit={handleSubmit(sendUser)}>
        <label>Username:</label>
        <input type="text" id="username" required {...register("email")} />

        <label>Password:</label>
        <input
          type="password"
          id="password"
          required
          {...register("password")}
        />

        <button>Login</button>
      </form>
    </div>
  );
}
export default Insert;
