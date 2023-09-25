import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import Card from "../Card/Card";
import "./List.css";

function List(): JSX.Element {
  const [items, setList] = useState<vacationModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedSort, setSelectedSort] = useState<string>("default"); // Default sorting option
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

  // Sorting function
  const sortItems = (a: vacationModel, b: vacationModel) => {
    switch (selectedSort) {
      case "place":
        return a.place.localeCompare(b.place);
      case "priceHtL":
        return a.price - b.price;
      case "priceLtH":
        return b.price - a.price;
      case "favorites":
        return isFav(a) ? -1 : 1;
      default:
        return 0;
    }
  };

  // Sort the currentItems array
  currentItems.sort(sortItems);

  return (
    <div>
      {/* Selection box for sorting */}
      <select
        value={selectedSort}
        onChange={(e) => setSelectedSort(e.target.value)}
        className="selectList"
      >
        <option value="default">Default Sorting</option>
        <option value="place">Sort by Name</option>
        <option value="priceHtL">Sort by Price (Higher to Lower)</option>
        <option value="priceLtH">Sort by Price (Lower to Higher)</option>
        <option value="favorites">Sort by Favorites</option>
        {/* Add more sorting options as needed */}
      </select>
      <div className="List">
        {currentItems.map((item) => (
          <Card key={item.vacationId} item={item} fav={isFav(item)} />
        ))}
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
    </div>
  );
}

export default List;
