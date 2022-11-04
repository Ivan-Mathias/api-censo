import { ErrorRequestHandler, Request, Response, NextFunction } from "express";

export default function errorHandler(err: Error | string, _request: Request, response: Response, _next: NextFunction) {
    if (typeof err === 'string') {
        const is404 = err.toLowerCase().endsWith('not found') || err.toLowerCase().endsWith('não encontrado');
        const statusCode = is404 ? 404 : 400;
        return response.status(statusCode).json({ message: err });
    }

    switch (err.name) {
        case 'ValidationError':
            return response.status(400).json({ message: err.message });
        case 'UnauthorizedError':
            return response.status(401).json({ message: err.message });
        case 'ConflictionError':
            return response.status(409).json({ message: err.message });
        default:
            return response.status(500).json({ message: err.message });
    }
}
