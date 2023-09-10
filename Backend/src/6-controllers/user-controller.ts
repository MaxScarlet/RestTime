import express, { Request, Response, NextFunction } from "express";
import userService from "../5-services/user-service";
import StatusCode from "../3-models/status-code";
import jwt from "jsonwebtoken";

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
      const users = await userService.getUsersById(userId);
      if (users.length === 0) {
        next({ message: "User not found", status: 404 });
      }
      if (users.length > 1) {
        next({ message: "Multiple users found", status: 300 });
      }
      response.json(users[0]);
    } catch (err: any) {
      next(err);
    }
  }
);

const secretKey = "I-am-Groot";

router.post(
  "/user/login",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const resp = await userService.login(request.body);
      const user = resp[0];

      if (user) {
        const token = jwt.sign(
          { userId: user.userId, isAdmin: user.isAdmin },
          secretKey,
          { expiresIn: "1h" }
        );
        response.json({ token });
      } else {
        response.sendStatus(StatusCode.Unauthorized);
      }
      //Cast to UserModel
      //const usersList = new userModel[]
    } catch (err: any) {
      next(err);
    }
  }
);
router.post(
  "/user",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const success: boolean = await userService.createUser(request.body);
      if (!success) {
        next({ message: "DB Error", status: 500 });
      }
      response.sendStatus(StatusCode.Created);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
