import { NextFunction, Request, Response } from "express";
import CensusService from "../services/CensusService";
import AnswerCensusDTO from "../types/DTOs/answer-census";
import CreateCensusDTO from "../types/DTOs/create-census";

export default class CensusController {
  constructor(
    private censusService: CensusService
  ){
  }

  async create(request: Request, response: Response, next: NextFunction) {
    const dto = request.body as CreateCensusDTO

    try {
      const result = await this.censusService.createCensus(dto)

      response.json(result)
    } catch (error) {
      next(error)
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.query.id as string)

    try {
      const result = await this.censusService.getCensusById(id)

      response.json(result)
    } catch (error) {
      next(error)
    }
  }

  async answer(request: Request, response: Response, next: NextFunction) {
    const dto = request.body as AnswerCensusDTO
    const user = request.user

    try {
      const result = await this.censusService.answerCensus(user?.id!, dto)

      response.json(result)
    } catch (error) {
      next(error)
    }
  }
}
