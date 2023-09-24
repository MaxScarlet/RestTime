import express, { Request, Response, NextFunction } from "express";
import UserService from "../5-services/user-service";
import StatusCode from "../3-models/status-code";
import jwt from "jsonwebtoken";

const router = express.Router();
const userService = new UserService();

//Get users from database
router.get(
  "/user",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      response.json(users);
    } catch (err: any) {
      response.sendStatus(StatusCode.NotFound);
    }
  }
);
router.get(
  "/user/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const users = await userService.getUserById(request.params.id);

      response.json(users);
    } catch (err: any) {
      response.sendStatus(StatusCode.NotFound);
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

router.put(
  "/user/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await userService.updateUserById(
        request.params.id,
        request.body
      );
      response.json(vacations);
    } catch (err: any) {
      response.sendStatus(StatusCode.NotFound).json(err);
    }
  }
);

router.post(
  "/user",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacation = await userService.createUser(request.body);
      if (vacation) {
        response.sendStatus(StatusCode.Created);
      } else {
        response.sendStatus(StatusCode.NotFound);
      }
      response.json(vacation);
    } catch (err: any) {
      response.sendStatus(StatusCode.NotFound).json(err);
    }
  }
);
router.delete(
  "/user/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;
      console.log(id);
      const user = await userService.deleteUserById(id);
      response.json("User with the id " + user.id + " has been deleted ");
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
