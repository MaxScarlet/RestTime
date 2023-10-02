/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import notifyService from "../../../Services/NotifyService";
import { useAuth } from "../../LayoutArea/AuthProvider";
import "./Login.css";

function Login(): JSX.Element {
  const { login } = useAuth();

  const [email, setEmail] = useState("maxim.kulik99@gmail.com");
  const [password, setPassword] = useState("123123");

  const navigate = useNavigate();

  async function handleLogin() {
    try {
      const loginToken = await login(email, password);
      navigate("/profile");
    } catch (error) {
      notifyService.error(error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
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
              minLength={4}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="button" onClick={handleLogin} className="login-button">
            Login
          </button>
        </form>
        <p>
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}
export default Login;
