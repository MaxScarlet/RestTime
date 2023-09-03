import { ChangeEvent, useEffect, useState } from "react";
import notifyService from "../../../Services/NotifyService";
import userService from "../../../Services/UserService";
import Card from "../Card/Card";
import "./List.css";
import UserModel from "../../../Models/UserModel";

function List(): JSX.Element {
  const [users, setUsers] = useState<UserModel[]>([]);

  useEffect(() => {
    showUsers();
  }, []);

  async function showUsers() {
    try {
      const dbUsers = await userService.getAllUsers();
      setUsers(dbUsers);
    } catch (err) {
      notifyService.error(err);
    }
  }

  return (
    <div className="List">
      {users.map((user) => (
        <Card key={user.userId} user={user} />
      ))}
    </div>
  );
}

export default List;
