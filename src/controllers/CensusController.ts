import { NextFunction, Request, Response } from "express";
import CensusService from "../services/CensusService";
import AlternativaEnviada from "../types/DTOs/answer-census";
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

  async getCensusList(request: Request, response: Response, next: NextFunction) {
    const user = request.user!

    try {
      const censusList = await this.censusService.getCensusList(user.id)

      response.json(censusList)
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
    const dto = request.body as AlternativaEnviada[]
    const { idCenso } = request.params
    const user = request.user

    try {
      await this.censusService.answerCensus(
        user?.id!, parseInt(idCenso), dto)

      response.status(201).end()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
