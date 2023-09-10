import dal from "../2-utils/dal";
import { OkPacket } from "mysql";
import UserModel from "../3-models/user-model";
import CredentialsModel from "../3-models/credential-model";
import jwt from "jsonwebtoken";

async function getAllUsers() {
  const sql = "SELECT * FROM users";
  const users = dal.execute(sql);
  return users;
}
async function getUsersById(userId: number): Promise<UserModel[]> {
  const sql = `SELECT * FROM users WHERE userId = ?`;
  const userById = await dal.execute(sql, [userId]);

  return userById;
}

async function login(credentials: CredentialsModel): Promise<UserModel> {
  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;
  console.log(`Credentials ${JSON.stringify(credentials)}`);

  const userById = await dal.execute(sql, [
    credentials.email,
    credentials.password,
  ]);

  return userById;
}

async function createUser(user: UserModel): Promise<boolean> {
  console.log(`User ${JSON.stringify(user)}`);
  //TODO: user.Validate

  //Dynamic sqlValues array
  //   const keys = Object.keys(user);
  //   const sqlValues = [];
  //   for (const key of keys) {
  //     const value = user[key];
  //     sqlValues.push(value);
  //   }

  const sql = `INSERT INTO users VALUES (DEFAULT,?,?,?,?,DEFAULT)`;
  //const sql = `INSERT INTO users (userId ,firstName,lastName,email,password,isAdmin)
  //                         VALUES(DEFAULT,?        ,?       ,?    ,?       ,DEFAULT)`;

  const sqlResponse = await dal.execute(sql, [
    user.firstName,
    user.lastName,
    user.email,
    user.password,
  ]);
  return sqlResponse.affectedRows === 1;
}

export default {
  getAllUsers,
  getUsersById,
  login,
  createUser,
};
