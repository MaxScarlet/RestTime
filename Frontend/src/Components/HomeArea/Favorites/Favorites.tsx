import { useEffect, useState } from "react";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import { useAuth } from "../../LayoutArea/AuthProvider";
import Card from "../../DataArea/Card/Card";
import "./Favorites.css";

function List(): JSX.Element {
  const [items, setList] = useState<vacationModel[]>([]);

  const token = useAuth().token;
  //   const navigate = useNavigate();
  //   if (!token) navigate("/");

  useEffect(() => {
    showList();
  }, []);

  async function showList() {
    try {
      const dbItems = await vacationService.getAll();
      setList(dbItems);
    } catch (err) {
      notifyService.error(err);
    }
  }
  const displayedItems = items.slice(0, 5);
  return (
    <div className="List">
      {displayedItems.map((item) => (
        <Card key={item.vacationId} item={item} />
      ))}
    </div>
  );
}

export default List;
