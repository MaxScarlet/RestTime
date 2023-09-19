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
router.post(
  "/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacations = await vacationService.addVacation(request.body);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

router.post(
  "/vacations",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      request.body.startDate = new Date(request.body.startDate)
        .toISOString()
        .split("T")[0];
      request.body.endDate = new Date(request.body.endDate)
        .toISOString()
        .split("T")[0];
      const vacations = await vacationService.getFavorites(request.body);
      response.json(vacations);
    } catch (err: any) {
      next(err);
    }
  }
);

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

router.put(
  "/vacations/:id",
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const vacationId = request.params._id;
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

export default router;
