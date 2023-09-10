import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import { useAuth } from "../../LayoutArea/AuthProvider";
import Card from "../Card/Card";
import "./List.css";

function List(): JSX.Element {
  const [items, setList] = useState<vacationModel[]>([]);

  const navigate = useNavigate();
  const token = useAuth().token;
  if (!token) navigate("/");

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

  return (
    <div className="List">
      {items.map((item) => (
        <Card key={item.vacationId} item={item} />
      ))}
    </div>
  );
}

export default List;
