import express from "express";
import swaggerUi from 'swagger-ui-express';
import swaggerJSDoc from 'swagger-jsdoc';

import cors from "cors";
import userController from "./6-controllers/user-controller";
import vacationController from "./6-controllers/vacation-controller";
import routeNotFound from "./4-middleware/route-not-found";
import catchAll from "./4-middleware/catch-all";
import appConfig from "./2-utils/app-config";
import mongo from "./2-utils/mongo-dal";
import expressFileUpload from "express-fileupload";
import path from "path";

const server = express();
const mongoDb = mongo.connect();

server.use(cors());
//Support file upload:
server.use(expressFileUpload());
server.use(express.json());

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'RestTime API',
            version: '1.0.0',
            description: 'API for RestTime project'
        }
    },
    apis: ['./src/6-controllers/*.ts']
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);
server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

server.use("/api", userController);
server.use("/api", vacationController);
server.use(routeNotFound);
server.use(catchAll);

server.listen(appConfig.port, () =>
  console.log("Listening on http://localhost:" + appConfig.port)
);
