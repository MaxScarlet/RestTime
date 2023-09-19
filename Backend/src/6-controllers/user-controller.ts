import express, { Request, Response, NextFunction } from "express";
import userService from "../5-services/user-service-mongo";
import StatusCode from "../3-models/status-code";
import jwt from "jsonwebtoken";

const router = express.Router();

//Get users from database
router.get(
  "/user",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();

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
      const userId = request.params.userId;
      const users = await userService.getUserById(userId);
      if (!users) {
        next({ message: "User not found", status: 404 });
      }

      response.json(users);
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
      const user = resp;

      if (user) {
        const token = jwt.sign(
          { userId: user.userId, isAdmin: user.isAdmin, id: user.id },
          secretKey,
          { expiresIn: "1h" }
        );
        response.json({ token });
      } else {
        response.sendStatus(StatusCode.Unauthorized);
      }
    } catch (err: any) {
      next(err);
    }
  }
);
router.post(
  "/user",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const newUser = await userService.createUser(request.body);
      console.log(newUser);
      if (newUser) {
        response.sendStatus(StatusCode.Created);
      } else {
        response.sendStatus(StatusCode.NotFound);
      }
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
