import { NextFunction, Request, Response } from "express"
import UsersService from "../services/UsersService"

export default class UsersController {
  constructor(
    private usersService: UsersService
  ){
  }

  async getAdminList(_request: Request, response: Response, next: NextFunction) {
    try {
      const adminList = await this.usersService.getAdminList()

      response.json(adminList)
    } catch (error) {
      next(error)
    }
  }

  async createAdmin(request: Request, response: Response, next: NextFunction) {
    const { email } = request.body

    try {
      await this.usersService.createAdmin(email)

      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }

  async removeAdminStatus(request: Request, response: Response, next: NextFunction) {
    const { id } = request.params

    try {
      await this.usersService.removeAdminStatus(parseInt(id))

      response.status(204).end()
    } catch (error) {
      next(error)
    }
  }
}
