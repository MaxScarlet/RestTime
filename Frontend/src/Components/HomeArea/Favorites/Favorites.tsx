import { useEffect, useState } from "react";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import { useAuth } from "../../LayoutArea/AuthProvider";
import Card from "../../DataArea/Card/Card";
import jwt_decode from "jwt-decode";
import "./Favorites.css";
import userService from "../../../Services/UserService";
import UserModel from "../../../Models/UserModel";

function List(): JSX.Element {
  const [items, setList] = useState<vacationModel[]>([]);
  const [loading, setLoading] = useState(true); //Boolean flag to determine loading status
  const [user, setUser] = useState<UserModel>();

  const token = useAuth().token;
  
  useEffect(() => {
    showList();
  }, []); // Re-fetch data when currentPage changes

  async function showList() {
    try {
      const userInfo = JSON.parse(localStorage.getItem("user")) as UserModel;
      const favsIds = userInfo.favorites;

      //Work with dbItems
      const dbItems = await vacationService.getFavs(favsIds);
      setList(dbItems);
    } catch (err) {
      notifyService.error(err);
    }
  }
  return (
    <div className="List">
      {items.map((item) => (
        <Card key={item.vacationId} item={item} fav={false} />
      ))}
    </div>
  );
}

export default List;
