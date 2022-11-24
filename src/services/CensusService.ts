import crypto from 'crypto'
import prismaClient from "../config/prisma";
import AnswerCensusDTO, { AlternativasSubmissao } from "../types/DTOs/answer-census";
import CreateCensusDTO from "../types/DTOs/create-census";
import ConflictionError from "../types/errors/ConflictionError";
import ValidationError from "../types/errors/ValidationError";

export default class CensusService {
  constructor() {
  }

  async createCensus(dto: CreateCensusDTO) {
    await prismaClient.censo.create({
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
  }

  async getCensusById(id: number) {
    const censo = await prismaClient.censo.findUnique({
      where: { id },
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

  async answerCensus(idUsuario: number, { idCenso, resultado: alternativasEnviadas }: AnswerCensusDTO) {
    const jaSubmeteu = await prismaClient.submissao.findUnique({
      where: { idCenso_idUsuario: { idCenso, idUsuario } }
    })

    if (jaSubmeteu) throw new ConflictionError('O usuário já respondeu esse censo')

    const idSubmissao = crypto.randomBytes(16).toString("hex");
    const perguntasCenso = await prismaClient.pergunta.findMany({
      where: { idCenso },
      include: { alternativas: true }
    })

    let alternativas: AlternativasSubmissao[] = []

    perguntasCenso.forEach(pergunta => {
      const filtro = alternativasEnviadas.filter(alternativaEnviada => (
        pergunta.alternativas.find(alternativaPergunta => (
          alternativaPergunta.id === alternativaEnviada.idAlternativa
        ))
      ))

      if (filtro.length === 0)
        throw new ValidationError('Pergunta está faltando')

      if (pergunta.tipo === 'UNICA' && filtro.length !== 1)
        throw new ValidationError('Pergunta foi enviada duas vezes')

      if (pergunta.tipo === 'TEXTO' && (filtro.length !== 1 || filtro[0].resposta === undefined))
        throw new ValidationError('Pergunta com campo de texto enviada em branco')

      alternativas.push.apply(alternativas, filtro.map(alt => ({ ...alt, idSubmissao })))
    });

    await prismaClient.resultado.createMany({ data: alternativas })
    await prismaClient.submissao.create({ data: { idCenso, idUsuario } })
  }
}
