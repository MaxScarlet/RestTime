import React, { useEffect, useState } from "react";
import { useAuth } from "../../LayoutArea/AuthProvider";
import userService from "../../../Services/UserService";
import UserModel from "../../../Models/UserModel";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Card from "../../DataArea/Card/Card";
import VacationModel from "../../../Models/VacationModel";
import vacationService from "../../../Services/VacationService";
import notifyService from "../../../Services/NotifyService";
import "../../DataArea/List/List.css";

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(true); //Boolean flag to determine loading status
  const lclUser = JSON.parse(localStorage.getItem("user")) as UserModel;
  const [user, setUser] = useState<UserModel>(lclUser);
  const [items, setList] = useState<VacationModel[]>([]);
  const favsIds = user.favorites;
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    showList()
      .then(() => {
        setRefresh(false);
      })
      .catch(() => {});
    setUser(lclUser);
    setLoading(false);
  }, [refresh]);

  async function showList() {
    try {
      const dbItems = await vacationService.getFavs(favsIds);
      setList(dbItems);
    } catch (err) {
      notifyService.error(err);
    }
  }
  function refreshList(vacationId?: string): void {
    if (lclUser.favorites.includes(vacationId)) {
      const index = lclUser.favorites.indexOf(vacationId, 0);
      lclUser.favorites.splice(index, 1);
    } else {
      lclUser.favorites.push(vacationId);
    }
    localStorage.setItem("user", JSON.stringify(lclUser));
    setRefresh(true);
  }
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
          <div className="List">
            {items.map((item) => (
              <Card
                key={item.vacationId}
                item={item}
                fav={true}
                refresh={() => refreshList(item._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
