import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import Card from "../../DataArea/Card/Card";
import "./EditVacation.css";
import { Link, useNavigate } from "react-router-dom";

function EditVacation(): JSX.Element {
  const vacation = JSON.parse(localStorage.getItem("vacation"));
  function formatDate(date: Date) {
    return new Date(date)
      .toISOString()
      .split("T")[0]
      .split("-")
      .reverse()
      .join("-");
  }
  const [place, setPlace] = useState(vacation.place);
  const [description, setDescription] = useState(vacation.description);
  const [startDate, setStartDate] = useState(formatDate(vacation.startDate));
  const [endDate, setEndDate] = useState(formatDate(vacation.endDate));
  const [price, setPrice] = useState(vacation.price);
  console.log(formatDate(vacation.endDate));

  localStorage.removeItem("vacation");
  const navigate = useNavigate();

  async function handleVacation() {
    const vacation = {
      place: place,
      description: description,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      price: price,
    } as vacationModel;
    try {
      console.log(vacation);
      //   const response = await vacationService.editVacation(vacation);
      //navigate("/login");
    } catch (error) {
      notifyService.error(error);
    }
  }

  //   function getCurrentDate(now: Date = new Date()) {
  //     const currentDate = new Date();
  //     const year = currentDate.getFullYear();
  //     const month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Add 1 to month because it's 0-indexed
  //     const day = String(currentDate.getDate()).padStart(2, "0");
  //     return `${year}-${month}-${day}`;
  //   }

  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2>Edit Vacation</h2>
        <form>
          <div className="form-group">
            <label>Place</label>
            <input
              type="text"
              placeholder="Enter place of the Vacation"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              className="desc"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Start Date</label>
            <input
              type="date"
              placeholder="Enter Start Date of vacation"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>End Date</label>
            <input
              type="date"
              placeholder="Enter End Date of vacation"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              min={0}
              step={0.01}
              placeholder="Enter price of vacation"
              value={price}
              onChange={(e) => setPrice(+e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleVacation}
            className="login-button"
          >
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditVacation;
