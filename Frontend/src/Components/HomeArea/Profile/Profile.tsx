import { useJwt } from "react-jwt";
import React, { useEffect, useState } from "react";

import { useAuth } from "../../LayoutArea/AuthProvider";
import userService from "../../../Services/UserService";
import UserModel from "../../../Models/UserModel";

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true);
  let user: UserModel;
  const token = useAuth().token;
//   const { decodedToken }: any = useJwt(token);
  const decodedToken = {
    userId: 1,
    isAdmin: 1,
    iat: 1694190018,
    exp: 1694193618,
  };
  useEffect(() => {
    userService
      .getUserInfo(decodedToken.userId)
      .then((userInfo) => {
        user = userInfo;
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
    //const user = await userService.getUserInfo();
  }, []);

  return (
    <div>
      <h2>User Profile</h2>
      {!user ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Name: {user.firstName}</p>
          <p>Email: {user.email}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;
