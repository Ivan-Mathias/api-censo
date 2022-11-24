import { Request, Response, NextFunction } from "express";
import { BaseError } from "../types/errors/BaseError";

export default function errorHandler(err: Error | string, _request: Request, response: Response, _next: NextFunction) {
    if (err instanceof BaseError) {
        return response.status(err.statusCode).send({ errors: err.serializeErrors() });
      }
}
