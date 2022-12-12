import { Role } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import AuthenticationError from "../types/errors/AuthenticationError";
import ForbiddenError from "../types/errors/ForbiddenError";

export default function authorize(request: Request, _response: Response, next: NextFunction, role?: Role) {
  if(request.user?.role === undefined) {
    throw new AuthenticationError('User is not authenticated')
  }

  if(role && request.user.role !== role){
    throw new ForbiddenError('User dont have the necessary permission')
  }

  next()
}
