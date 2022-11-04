import { Censo, Prisma } from "@prisma/client";
import prismaClient from "../config/prisma";
import CreateCensusDTO from "../types/DTOs/create-census";

export default class CensusService {
  constructor() {
  }

  async createCensus(dto: CreateCensusDTO) {
    const censo = await prismaClient.censo.create({
      data: {
        nome: dto.name,
        visivel: dto.visible ?? false,
        perguntas: {
          create: dto.questions.map(question => ({
            texto: question.text,
            alternativas: {
              createMany: {
                data: question.options.map(option => ({
                  texto: option.text
                }))
              }
            }
          }))
        }
      },
      include: {
        perguntas: {
          include: {
            alternativas: true
          }
        }
      }
    })

    return censo
  }
}
