/* eslint-disable @typescript-eslint/no-unused-vars */
import { Link, useNavigate } from "react-router-dom";
import "../Login/Login.css";
import notifyService from "../../../Services/NotifyService";
import { useState } from "react";
import { useAuth } from "../../LayoutArea/AuthProvider";
import userService from "../../../Services/UserService";
import UserModel from "../../../Models/UserModel";

function SignUp(): JSX.Element {
  const [email, setEmail] = useState<string>();
  const [password, setPassword] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();

  const navigate = useNavigate();

  async function handleSignUp() {
    const user = {
      firstName,
      lastName,
      email,
      password,
    } as UserModel;
    try {
      const response = await userService.signUp(user);
      navigate("/login");
    } catch (error) {
      notifyService.error(error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Sign Up</h2>
        <form>
          <div className="form-group">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter your First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter your Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              minLength={4}
              required
            />
          </div>
          <button type="button" onClick={handleSignUp} className="login-button">
            Sign Up
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}
export default SignUp;
