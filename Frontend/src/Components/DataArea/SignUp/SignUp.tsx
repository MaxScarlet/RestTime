import { useNavigate } from "react-router-dom";
import "../Login/Login.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import notifyService from "../../../Services/NotifyService";
import userService from "../../../Services/UserService";
import CredentialsModel from "../../../Models/CredentialModel";
import { useState } from "react";
import React from "react";
import { useAuth } from "../../LayoutArea/AuthProvider";

function SignUp(): JSX.Element {
  //const { register, handleSubmit, formState } = useForm<UserModel>();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function handleLogin() {
    //credentials: CredentialsModel
    try {
      const token = await login(email, password);
      navigate("/list");
    } catch (error) {
      notifyService.error(error);
    }
  }

  return (
    <div className="container">
      <form>
        <label>Email:</label>
        <input
          type="text"
          id="Email"
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password:</label>
        <input
          type="password"
          id="password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="button" onClick={handleLogin}>
          Login
        </button>
      </form>
    </div>
  );
}
export default SignUp;
