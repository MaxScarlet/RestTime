import express, { NextFunction, Request, Response } from "express";
import imageHandle from "../2-utils/image-handle";
import VacationService from "../5-services/vacation-service";

const router = express.Router();
const service = new VacationService();

/**
 * @swagger
 * tags:
 *   name: Vacations
 *   description: API operations for managing vacations
 */

/**
 * @swagger
 * /api/vacations:
 *   get:
 *     description: Get vacations from database
 *     tags: [Vacations]
 *     responses:
 *       200:
 *         description: Success
 */
router.get(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const isAdmin = request.headers["x-resttime-isadmin"] as string;
      const vacations = await service.getAllVacations(
        isAdmin.toLowerCase() === "true"
      );
      //TODO: filter by user roles
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);
/**
 * @swagger
 * /api/vacations/{id}:
 *   get:
 *     summary: Get a vacation by ID
 *     tags: [Vacations]
 *     description: Get details of a vacation by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the vacation to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success, returns the vacation details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacation'
 *       404:
 *         description: Vacation not found
 */
router.get(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params.id;
      const vacations = await service.getVacationById(vacationId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /api/vacations:
 *   post:
 *     summary: Create a new vacation
 *     tags: [Vacations]
 *     description: Create a new vacation with the provided data.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacationInput'
 *     responses:
 *       201:
 *         description: Success, the vacation has been created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacation'
 *       400:
 *         description: Bad request, invalid data provided
 */
router.post(
  "/",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.picture = request.files["picture[]"];

      const vacations = await service.addVacation(request.body);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);
/**
 * @swagger
 * /api/vacations/favorites:
 *   post:
 *     summary: Add a vacation to favorites
 *     tags: [Vacations]
 *     description: Add a vacation to the user's list of favorite vacations.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FavoriteVacationInput'
 *     responses:
 *       201:
 *         description: Success, the vacation has been added to favorites
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacation'
 *       400:
 *         description: Bad request, invalid data provided
 *       404:
 *         description: Vacation not found
 */
router.post(
  "/favorites",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await service.getFavorites(request.body);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);
/**
 * @swagger
 * /api/vacations/{id}:
 *   put:
 *     summary: Update a vacation by ID
 *     tags: [Vacations]
 *     description: Update the details of a vacation by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the vacation to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacationInput'
 *     responses:
 *       200:
 *         description: Success, the vacation has been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacation'
 *       400:
 *         description: Bad request, invalid data provided
 *       404:
 *         description: Vacation not found
 */
router.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.picture = request.files["picture[]"];
      const vacations = await service.updateVacationById(
        request.params.id,
        request.body
      );
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /api/vacations/{id}:
 *   delete:
 *     summary: Delete a vacation by ID
 *     tags: [Vacations]
 *     description: Delete a vacation by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the vacation to delete
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: Success, the vacation has been deleted
 *       404:
 *         description: Vacation not found
 */
router.delete(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params.id;
      console.log(vacationId);
      const vacations = await service.deleteVacationById(vacationId);
      response.json(
        "Vacation with the id " + vacationId + " has been deleted "
      );
    } catch (err: any) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /api/vacations/{id}:
 *   put:
 *     summary: Update a vacation by ID
 *     tags: [Vacations]
 *     description: Update the details of a vacation by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the vacation to update
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VacationInput'
 *     responses:
 *       200:
 *         description: Success, the vacation has been updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Vacation'
 *       400:
 *         description: Bad request, invalid data provided
 *       404:
 *         description: Vacation not found
 */
router.put(
  "/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params.id;
      console.log(vacationId);
      const vacations = await service.updateVacationById(
        vacationId,
        request.body
      );
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);
/**
 * @swagger
 * /api/vacations/{id}/image:
 *   get:
 *     summary: Get a vacation's image by ID
 *     tags: [Vacations]
 *     description: Get the image of a vacation by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the vacation to retrieve the image for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success, returns the vacation's image
 *         content:
 *           image/*:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: Vacation not found or image not available
 */
router.get(
  "/:id/image",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const id = request.params.id;

      const absolutePath = imageHandle.genFilePath(id + ".jpg");

      response.sendFile(absolutePath);
    } catch (err: any) {
      next(err);
    }
  }
);

export default router;
