/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import reportsService from "../../../Services/ReportsService";
import vacationService from "../../../Services/VacationService";
import Card from "../../DataArea/Card/Card";
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

  async function fetchLikes(vacationId: string): Promise<number> {
    try {
      const likeCount = await reportsService.getInfo(vacationId);
      setRefresh(true);
      return likeCount;
    } catch (error) {
      console.error("Error fetching like count:", error);
      return 0;
    }
  }
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
