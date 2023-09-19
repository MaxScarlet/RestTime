import express from "express";
import cors from "cors";
import userController from "./6-controllers/user-controller";
import vacationController from "./6-controllers/vacation-controller";
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";

const server = express();

server.use(cors());
server.use(express.json());
server.use("/api", userController);
server.use("/api", vacationController);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () =>
  console.log("Listening on http://localhost:" + appConfig.port)
);
