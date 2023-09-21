import { useEffect, useState } from "react";
import UserModel from "../../../Models/UserModel";
import vacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationService from "../../../Services/VacationService";
import Card from "../../DataArea/Card/Card";
import "./EditVacation.css";

function EditVacation(): JSX.Element {
  return (
    <div className="List">
      <h1>Edit Vacation</h1>
    </div>
  );
}

export default EditVacation;
