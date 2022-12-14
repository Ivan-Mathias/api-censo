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

  async update(request: Request, response: Response, next: NextFunction) {
    const dto = request.body as CreateCensusDTO
    const id = parseInt(request.params.idCenso)

    try {
      await this.censusService.updateCensus(id, dto)
      response.status(204).end()
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

  async getResultsById(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.idCenso)
    const user = request.user

      try {
        const result = await this.censusService.getResultsById(user?.id!, id)

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

  async close(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.idCenso)
    const user = request.user

    try {
      await this.censusService.closeCensus(user?.id!, id)
      response.status(204).end()
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
