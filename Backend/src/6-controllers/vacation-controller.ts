import express, { NextFunction, Request, Response } from "express";
import imageHandle from "../2-utils/image-handle";
import VacationService from "../5-services/vacation-service";

const router = express.Router();
const vacationService = new VacationService();

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
  "/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await vacationService.getAllVacations();
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);
/**
 * @swagger
 * /vacations/{id}:
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
 *           type: integer
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
  "/vacations/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params.id;
      const vacations = await vacationService.getVacationById(vacationId);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

/**
 * @swagger
 * /vacations:
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
  "/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.picture = request.files["picture[]"];

      const vacations = await vacationService.addVacation(request.body);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);
/**
 * @swagger
 * /vacations/favorites:
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
  "/vacations/favorites",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await vacationService.getFavorites(request.body);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);
/**
 * @swagger
 * /vacations/{id}:
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
 *           type: integer
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
  "/vacations/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.picture = request.files["picture[]"];
      const vacations = await vacationService.updateVacationById(
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
 * /vacations/{id}:
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
 *           type: integer
 *     responses:
 *       204:
 *         description: Success, the vacation has been deleted
 *       404:
 *         description: Vacation not found
 */
router.delete(
  "/vacations/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params.id;
      console.log(vacationId);
      const vacations = await vacationService.deleteVacationById(vacationId);
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
 * /vacations/{id}:
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
 *           type: integer
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
  "/vacations/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params.id;
      console.log(vacationId);
      const vacations = await vacationService.updateVacationById(
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
 * /vacations/{id}/image:
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
 *           type: integer
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
  "/vacations/:id/image",
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
