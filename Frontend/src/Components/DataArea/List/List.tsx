import { useEffect, useState } from "react";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import { useAuth } from "../../LayoutArea/AuthProvider";
import Card from "../Card/Card";
import AdminCard from "../AdminCard/AdminCard";
import "./List.css";
import UserModel from "../../../Models/UserModel";

function List(): JSX.Element {
  const [items, setList] = useState<vacationModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage: number = 9;
  const userInfo = JSON.parse(localStorage.getItem("user")) as UserModel;
  const favsIds = userInfo.favorites;

  useEffect(() => {
    showList();
  }, [currentPage]); // Re-fetch data when currentPage changes

  async function showList() {
    try {
      const dbItems: vacationModel[] = await vacationService.getAll();

      setList(dbItems);
    } catch (err) {
      notifyService.error(err);
    }
  }

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;
  const currentItems: vacationModel[] = items.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  const totalPages: number = Math.ceil(items.length / itemsPerPage);

  function nextPage() {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  function prevPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function isFav(item: vacationModel) {
    return favsIds.includes(item._id);
  }
  function isAdmin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user.isAdmin) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <div className="List">
      {currentItems.map((item) =>
        isAdmin() ? (
          <AdminCard key={item.vacationId} item={item} />
        ) : (
          <Card key={item.vacationId} item={item} fav={isFav(item)} />
        )
      )}
      <div className="pagination">
        <button onClick={prevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button onClick={nextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default List;
