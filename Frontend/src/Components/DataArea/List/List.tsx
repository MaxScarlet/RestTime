/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import Card from "../Card/Card";
import "./List.css";

function List(): JSX.Element {
  const [items, setList] = useState<vacationModel[]>([]); //Set item list
  const [currentPage, setCurrentPage] = useState<number>(1); //Set current page for pagination
  const [selectedSort, setSelectedSort] = useState<string>("default"); // Default sorting option
  const [refresh, setRefresh] = useState(false); //Set refresh state for the cards
  const itemsPerPage: number = 9; //Set the amount of cards per page
  const userInfo = JSON.parse(localStorage.getItem("user")) as UserModel; //Getting userInfo from lclStorage
  const favsIds = userInfo.favorites; //FavsIds array

  useEffect(() => {
    showList()
      .then(() => {
        setRefresh(false);
      })
      .catch(() => {});
  }, [currentPage, selectedSort, refresh]);

  //Function to show all cards in the list provided from API
  async function showList() {
    try {
      let dbItems: vacationModel[] = await vacationService.getAll(
        userInfo.isAdmin
      );

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
  const sortItems = (a: vacationModel, b: vacationModel): number => {
    switch (selectedSort) {
      case "place":
        return a.place.localeCompare(b.place);
      case "priceHtL":
        return b.price - a.price;
      case "priceLtH":
        return a.price - b.price;
      case "favorites":
        return isFav(a) ? -1 : 1;
      case "notStartedYet":
        const currentDate = new Date();
        const aStartDate = new Date(a.startDate);
        const bStartDate = new Date(b.startDate);
        return aStartDate > currentDate ? -1 : bStartDate > currentDate ? 1 : 0;
      case "currentlyActive":
        const currentDateTime = new Date();
        const aStartDateAndTime = new Date(a.startDate);
        const aEndDateAndTime = new Date(a.endDate);
        const bStartDateAndTime = new Date(b.startDate);
        const bEndDateAndTime = new Date(b.endDate);

        const aIsActive =
          currentDateTime >= aStartDateAndTime &&
          currentDateTime <= aEndDateAndTime;
        const bIsActive =
          currentDateTime >= bStartDateAndTime &&
          currentDateTime <= bEndDateAndTime;

        return aIsActive ? -1 : bIsActive ? 1 : 0;
      default:
        // Sort by startDate in ascending order
        const aStartDateSort = new Date(a.startDate);
        const bStartDateSort = new Date(b.startDate);
        return aStartDateSort.getTime() - bStartDateSort.getTime();
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
        <option value="currentlyActive">Currently active</option>
        <option value="notStartedYet">Not Started Yet</option>
        <option value="favorites">Sort by Favorites</option>
        <option value="priceHtL">Sort by Price (Higher to Lower)</option>
        <option value="priceLtH">Sort by Price (Lower to Higher)</option>
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
