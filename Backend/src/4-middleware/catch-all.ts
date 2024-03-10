import { NextFunction, Request, Response } from "express";

function catchAll(err: any, request: Request, response: Response, next: NextFunction) {
    
    console.log(err);

    const statusCode = err.status || 500; 

    response.status(statusCode).send(err.message);
}

export default catchAll;
