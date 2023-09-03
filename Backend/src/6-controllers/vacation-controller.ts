import express, { Request, Response, NextFunction } from "express";
import vacationService from "../5-services/vacation-service";

const router = express.Router();

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

export default router;
