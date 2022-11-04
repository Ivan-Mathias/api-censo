import { Request, Response, NextFunction } from "express";
import * as Yup from 'yup'

export default async function validateRequest(request: Request, _response: Response, next: NextFunction, schema: Yup.AnySchema) {
    const options = {
        abortEarly: false,
        stripUnknown: true
    };

    try {
        switch(request.method) {
            case 'POST':
                request.body = await schema.validate(request.body, options);
                break;

            case 'GET':
                request.query = await schema.validate(request.query, options);

        }
        next();
    } catch (error) {
        next ({ name: 'ValidationError', message: `${error}`})
    }
}
