import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import CredentialsModel from "../3-models/credential-model";

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

async function login(credentials: CredentialsModel): Promise<UserModel> {
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  const userById = await dal.execute(sql, [
    credentials.email,
    credentials.password,
  ]);

  return userById;
}

export default {
  getAllUsers,
  getUsersById,
  login,
};
