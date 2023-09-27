import React, { useEffect, useState } from "react";
import { useAuth } from "../../LayoutArea/AuthProvider";
import userService from "../../../Services/UserService";
import UserModel from "../../../Models/UserModel";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true); //Boolean flag to determine loading status
  const [user, setUser] = useState<UserModel>();

  useEffect(() => {
    const lclUser = localStorage.getItem("user");
    const user = JSON.parse(lclUser) as UserModel;
    setUser(user);
    setLoading(false);
  }, []);

  //   return !token ? null : (
  return (
    <div>
      <h2>User Profile</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Full Name: {user.firstName + " " + user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Admin: {user.isAdmin ? "Yes" : "No"}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
