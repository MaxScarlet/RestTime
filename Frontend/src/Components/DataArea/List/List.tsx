/* eslint-disable react-hooks/exhaustive-deps */
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
  const [refresh, setRefresh] = useState(false);
  const itemsPerPage: number = 9;
  const userInfo = JSON.parse(localStorage.getItem("user")) as UserModel;
  const favsIds = userInfo.favorites;

  useEffect(() => {
    showList()
      .then(() => {
        setRefresh(false);
      })
      .catch(() => {});
  }, [currentPage, selectedSort, refresh]);

  async function showList() {
    try {
      let dbItems: vacationModel[] = await vacationService.getAll(userInfo.isAdmin);

      // Sort the items based on the selectedSort
      dbItems = dbItems.sort(sortItems);

      setList(dbItems);
    } catch (err) {
      notifyService.error(err);
    }
  }
  //Start of pagination
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
  //End of pagination

  //Start favorite handle
  function isFav(item: vacationModel) {
    return favsIds.includes(item._id);
  }
  function refreshList(vacationId?: string): void {
    if (userInfo.favorites.includes(vacationId)) {
      const index = userInfo.favorites.indexOf(vacationId, 0);
      userInfo.favorites.splice(index, 1);
    } else {
      userInfo.favorites.push(vacationId);
    }
    localStorage.setItem("user", JSON.stringify(userInfo));
    setRefresh(true);
  }
  //End favorite handle

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
        {/* Add more sorting options as needed */}
      </select>
      <div className="List">
        {itemsOnPage.map((item) => (
          <Card
            key={item._id}
            item={item}
            fav={isFav(item)}
            refresh={() => refreshList(item._id)}
          />
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
