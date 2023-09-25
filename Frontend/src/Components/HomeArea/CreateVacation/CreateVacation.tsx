import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import "./EditVacation.css";

function CreateVacation(): JSX.Element {
  const { register, handleSubmit } = useForm();
  const params = useParams();
  const [vacation, setVacation] = useState<VacationModel>();
  const [loading, setLoading] = useState(true); //Boolean flag to determine loading status

  async function getVacation() {
    vacationService
      .getInfo(params.id)
      .then((vacation) => {
        setVacation(vacation);
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error getting vacation", error);
        setLoading(false);
      });
  }

  function formatDate(date: Date) {
    return new Date(date).toISOString().split("T")[0];
  }

  useEffect(() => {
    getVacation();
  }, []);

  const navigate = useNavigate();

  async function handleVacation(vacation: any) {
    try {
      console.log("Edited vacation:", vacation);

      //vacation.startDate = new Date(vacation.startDateFormat);
      //vacation.endDate = new Date(vacation.endDateFormat);

      //   const response = await vacationService.editVacation(vacation);
    } catch (error) {
      notifyService.error(error);
    }
  }
  return (
    <div className="edit-container">
      <div className="edit-box">
        <h2>Edit Vacation</h2>
        {!loading ? (
          <form onSubmit={handleSubmit(handleVacation)}>
            <div className="form-group">
              <label>Place</label>
              <input
                type="text"
                id="place"
                placeholder="Enter place of the Vacation"
                defaultValue={vacation.place}
                {...register("place")}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                className="desc"
                name="description"
                placeholder="Enter Description"
                defaultValue={vacation.description}
                {...register("description")}
              />
            </div>

            <div className="form-group">
              <label>Start Date</label>
              <input
                type="date"
                name="startDate"
                placeholder="Enter Start Date of vacation"
                min={formatDate(vacation.startDate)}
                defaultValue={formatDate(vacation.startDate)}
                {...register("startDate")}
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input
                type="date"
                name="endDate"
                placeholder="Enter End Date of vacation"
                min={formatDate(vacation.endDate)}
                defaultValue={formatDate(vacation.endDate)}
                {...register("endDate")}
              />
            </div>
            <div className="form-group">
              <label>Price</label>
              <input
                type="number"
                name="price"
                min={0}
                step={0.01}
                placeholder="Enter price of vacation"
                defaultValue={vacation.price}
                {...register("price")}
              />
            </div>
            <button className="login-button">Edit</button>
          </form>
        ) : (
          <p> Loading...</p>
        )}
      </div>
    </div>
  );
}

export default CreateVacation;
