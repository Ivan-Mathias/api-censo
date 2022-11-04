import { NextFunction, Request, Response } from "express";
import CensusService from "../services/CensusService";
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
}
