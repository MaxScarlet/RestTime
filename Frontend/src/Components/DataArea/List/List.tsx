/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import Card from "../Card/Card";
import "./List.css";
import { useAuth } from "../../LayoutArea/AuthProvider";

function List(): JSX.Element {
  const [items, setList] = useState<vacationModel[]>([]); //Set item list
  const [currentPage, setCurrentPage] = useState<number>(1); //Set current page for pagination
  const [selectedSort, setSelectedSort] = useState<string>("default");
  const [refresh, setRefresh] = useState(false); //Set refresh state for the cards
  const { token, logout, isAdmin } = useAuth();
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
        const aStartDateSort = new Date(a.startDate);
        const bStartDateSort = new Date(b.startDate);
        return aStartDateSort.getDate() - bStartDateSort.getDate();
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSort(event.target.value);
  };

  return (
    <div>
      {isAdmin() ? null : (
        <div className="sortDiv">
          {/* checkBox default */}
          <label>
            <input
              type="radio"
              value="default"
              checked={selectedSort === "default"}
              onChange={handleSortChange}
            />
            Default
          </label>
          {/* checkBox favorites */}
          <label>
            <input
              type="radio"
              value="favorites"
              checked={selectedSort === "favorites"}
              onChange={handleSortChange}
            />
            Sort by favorites
          </label>
          {/* checkBox notStartedYet */}
          <label>
            <input
              type="radio"
              value="notStartedYet"
              checked={selectedSort === "notStartedYet"}
              onChange={handleSortChange}
            />
            Sort by not started yet
          </label>
          {/* checkBox currentlyActive */}
          <label>
            <input
              type="radio"
              value="currentlyActive"
              checked={selectedSort === "currentlyActive"}
              onChange={handleSortChange}
            />
            Sort by currently active
          </label>
        </div>
      )}
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
