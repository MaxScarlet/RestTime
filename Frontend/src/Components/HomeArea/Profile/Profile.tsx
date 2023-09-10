import React, { useEffect, useState } from "react";
import { useAuth } from "../../LayoutArea/AuthProvider";
import userService from "../../../Services/UserService";
import UserModel from "../../../Models/UserModel";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true); //Boolean flag to determine loading status
  const [user, setUser] = useState<UserModel>();

  //UnAuth access handler
  const token = useAuth().token;
  const navigate = useNavigate();
  if (!token) navigate("/");

  useEffect(() => {
    if (token) {
      const decodedToken: any = jwt_decode(token);
      userService
        .getItem(decodedToken.userId)
        .then((userInfo) => {
          setUser(userInfo);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user profile:", error);
          //Add new section for error messages
          setLoading(false);
        });
    }
  }, []);

  //   return !token ? null : (
  return (
    <div>
      <h2>User Profile</h2>
      {loading ? (
        //Add loading spinner
        <p>Loading...</p>
      ) : (
        <div>
          <p>Name: {user.firstName + " " + user.lastName}</p>
          <p>Email: {user.email}</p>
          <p>Admin: {user.isAdmin ? "Yes" : "No"}</p> {/* Add profile! */}
        </div>
      )}
    </div>
  );
};

export default Profile;
