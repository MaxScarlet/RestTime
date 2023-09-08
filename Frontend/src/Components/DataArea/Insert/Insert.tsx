import { useNavigate } from "react-router-dom";
import "./Insert.css";
import { useForm } from "react-hook-form";
import UserModel from "../../../Models/UserModel";
import notifyService from "../../../Services/NotifyService";
import userService from "../../../Services/UserService";
import CredentialsModel from "../../../Models/CredentialModel";
import { useState } from "react";
import React from "react";

function Insert(): JSX.Element {
  //const { register, handleSubmit, formState } = useForm<UserModel>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  async function sendUser() {
    //credentials: CredentialsModel
    try {
      const token = await userService.login({email, password});
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

        <button type="button" onClick={sendUser}>
          Login
        </button>
      </form>
    </div>
  );
}
export default Insert;
