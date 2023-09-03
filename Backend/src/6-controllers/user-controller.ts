import express, { Request, Response, NextFunction } from "express";
import userService from "../5-services/user-service";
import StatusCode from "../3-models/status-code";

const router = express.Router();

//Get users from database
router.get(
  "/user",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();

      //Cast to user model
      //const usersList = new userModel[]

      response.json(users);
    } catch (err: any) {
      next(err);
    }
  }
);

router.get(
  "/user/:userId",
  async (request: Request, response: Response, next: NextFunction) => {
    try {

      const userId = +request.params.userId;
      const user = await userService.getUsersById(userId);
      response.json(user);

    } catch (err: any) {
      next(err);
    }
  }
);


export default router;
