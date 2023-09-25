import express, { Request, Response, NextFunction } from "express";
import VacationService from "../5-services/vacation-service";
import path from "path";
import imageHandle from "../2-utils/image-handle";

const router = express.Router();
const vacationService = new VacationService();

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
