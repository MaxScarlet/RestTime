import { useEffect, useState } from "react";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import { useAuth } from "../../LayoutArea/AuthProvider";
import Card from "../Card/Card";
import "./List.css";

function List(): JSX.Element {
  const [items, setList] = useState<vacationModel[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedPage, setSelectedPage] = useState<number>(currentPage);
  const itemsPerPage: number = 9;
  const token = useAuth().token;

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

  return (
    <div className="List">
      {currentItems.map((item) => (
        <Card key={item.vacationId} item={item} />
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
  );
}

export default List;
