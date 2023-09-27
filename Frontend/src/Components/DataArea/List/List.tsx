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
  }, [currentPage, selectedSort]); // Re-fetch data when currentPage changes

  async function showList() {
    try {
      let dbItems: vacationModel[] = await vacationService.getAll();

      // Sort the items based on the selectedSort
      dbItems = dbItems.sort(sortItems);

      setList(dbItems);
    } catch (err) {
      notifyService.error(err);
    }
  }

  const indexOfLastItem: number = currentPage * itemsPerPage;
  const indexOfFirstItem: number = indexOfLastItem - itemsPerPage;

  const itemsOnPage: vacationModel[] = items.slice(
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

  // Sorting function
  const sortItems = (a: vacationModel, b: vacationModel) => {
    switch (selectedSort) {
      case "place":
        return a.place.localeCompare(b.place);
      case "priceHtL":
        return b.price - a.price;
      case "priceLtH":
        return a.price - b.price;
      case "favorites":
        return isFav(a) ? -1 : 1;
      default:
        return 0;
    }
  };

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
        <option value="favorites">Sort by Favorites</option>
        {/* Add more sorting options as needed */}
      </select>
      <div className="List">
        {itemsOnPage.map((item) => (
          <Card key={item._id} item={item} fav={isFav(item)} />
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
