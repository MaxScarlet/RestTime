import express, { NextFunction, Request, Response } from "express";
import imageHandle from "../2-utils/image-handle";
import ReportsService from "../5-services/reports-service";
import StatusCode from "../3-models/status-code";
import { parseArgs } from "util";

const router = express.Router();
const service = new ReportsService();

/**
 * @swagger
 * tags:
 *   name: Reports
 *   description: API operations for managing vacations
 */
/**
 * @swagger
 * /api/reports/vacations/{vacationId}/favorites:
 *   get:
 *     summary: Get users who favorites a specific vacation
 *     tags: [Reports]
 *     description: Get a list of users who have favorites a specific vacation by its ID.
 *     parameters:
 *       - in: path
 *         name: vacationId
 *         description: ID of the vacation to retrieve favorites for
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success, returns a list of users who favorites the vacation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Vacation not found or no users have favorites it
 */
router.get(
  "/vacations/:vacationId/favorites",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params.vacationId;
      const favs = await service.getFavorites(vacationId);
      response.json(favs.length);
    } catch (err: any) {
      response.sendStatus(StatusCode.NotFound);
    }
  }
);
/**
 * @swagger
 * /api/reports/vacations/favorites:
 *   get:
 *     summary: Get users who favorites a specific vacation
 *     tags: [Reports]
 *     description: Get a list of users who have favorites a specific vacation by its ID.
 *     responses:
 *       200:
 *         description: Success, returns a list of users who favorites the vacation
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       404:
 *         description: Vacation not found or no users have favorites it
 */
router.get(
  "/vacations/favorites",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const favs = await service.getAllFavorites();
      response.json(favs);
    } catch (err: any) {
      response.sendStatus(StatusCode.NotFound);
    }
  }
);

export default router;
