import express, { Request, Response, NextFunction } from "express";
import UserService from "../5-services/user-service";
import StatusCode from "../3-models/status-code";
import jwt from "jsonwebtoken";

const router = express.Router();
const userService = new UserService();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API operations for managing users
 */

/**
 * @swagger
 * /api/user:
 *   get:
 *     description: Get users from database
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Success
 */
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
/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get user information by ID
 *     tags: [Users]
 *     description: Get detailed information about a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Success, returns user information
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User not found
 */
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
/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: User login
 *     tags: [Users]
 *     description: Authenticate a user by their credentials and generate a login token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserLoginInput'
 *     responses:
 *       200:
 *         description: Success, user has been authenticated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   description: Authentication token
 *       401:
 *         description: Unauthorized, invalid credentials
 */
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

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update user information by ID
 *     tags: [Users]
 *     description: Update detailed information about a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to update
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateInput'
 *     responses:
 *       200:
 *         description: Success, user information has been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid data provided
 *       404:
 *         description: User not found
 */
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
/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create a new user
 *     tags: [Users]
 *     description: Create a new user with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserInput'
 *     responses:
 *       201:
 *         description: Success, a new user has been created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid data provided
 */
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
/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     description: Delete a user by their ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to delete
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Success, the user has been deleted
 *       404:
 *         description: User not found
 */
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
