import dal from "../2-utils/dal";
import { OkPacket } from "mysql";

async function getAllVacations() {
  const sql = "SELECT * FROM vacations";
  const vacations = dal.execute(sql);
  return vacations;
}

export default {
  getAllVacations,
};
