import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";

async function getAllUsers() {
    const sql = "SELECT * FROM users";
    const users = dal.execute(sql);
    return users;
}
async function getUsersById(userId: number): Promise<UserModel> {
  const sql = `SELECT * FROM users WHERE userId = ?`;
  const userById = await dal.execute(sql, [userId]);

  return userById;
}


export default {
  getAllUsers,
  getUsersById,
};

