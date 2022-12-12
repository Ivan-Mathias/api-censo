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
      console.log(error)
      next(error)
    }
  }

  async getStats(request: Request, response: Response, next: NextFunction) {
    const user = request.user!

    try {
      const censusCount = await this.censusService.getStats(user.id)

      response.json(censusCount)
    } catch (error) {
      next(error)
    }
  }

  async getById(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.idCenso)

    try {
      const result = await this.censusService.getCensusById(id)

      response.json(result)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async getTcleById(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.idCenso)

    try {
      const result = await this.censusService.getCensusTcleById(id)

      response.json(result)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  async answer(request: Request, response: Response, next: NextFunction) {
    const dto = request.body as AnswerCensusDTO
    const { idCenso } = request.params
    const user = request.user

    console.log(idCenso)

    try {
      const result = await this.censusService.answerCensus(
        user?.id!, parseInt(idCenso), dto)

      response.json(result)
    } catch (error) {
      next(error)
    }
  }
}
