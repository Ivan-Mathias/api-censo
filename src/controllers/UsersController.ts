import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcrypt';
import UsersService from "../services/UsersService";

export default class UsersController {
  saltRounds: number;

  constructor(
    private usersService: UsersService
  ){
    this.saltRounds = 10
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const { nusp, email, senha } = request.body

    try {
      const senhaHash = bcrypt.hashSync(senha, this.saltRounds)

      const userDetails = await this.usersService.createUser(nusp, email, senhaHash)

      response.status(201).json(userDetails)
    } catch (error) {
      next(error)
    }
  }
}
