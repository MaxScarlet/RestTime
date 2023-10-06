/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
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
        setLoading(false);
      });
  }

  function formatDate(date: Date | string) {
    let dateObj;
    if (typeof date === "string") {
      dateObj = new Date(date);
    } else {
      dateObj = date;
    }
    return dateObj.toISOString().split("T")[0];
  }

  useEffect(() => {
    if (!params.id) {
      setVacation(new VacationModel());
      setLoading(false);
    } else {
      getVacation();
    }
  }, []);

  const navigate = useNavigate();

  async function handleVacation(vacation: any) {
    try {
      const id = params.id;
      let response;

      if (id) {
        response = await vacationService.editVacation(vacation, id);
      } else {
        response = await vacationService.addVacation(vacation);
      }
      navigate("/vacation");
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
                max={10000}
                placeholder="Enter price of vacation"
                defaultValue={vacation.price}
                {...register("price")}
              />
            </div>
            <div
              className="form-group"
              style={{
                backgroundImage: `url(${vacation.picturePath})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                position: "relative",
                height: "150px",
              }}
            >
              <input
                type="file"
                name="picture"
                accept="image/*"
                placeholder="Select picture for the vacation"
                {...register("picture")}
              />
            </div>
            <button className="login-button">Submit</button>
          </form>
        ) : (
          <p> Loading...</p>
        )}
      </div>
    </div>
  );
}

export default EditVacation;
