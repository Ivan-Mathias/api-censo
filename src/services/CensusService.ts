import crypto from 'crypto'
import prismaClient from "../config/prisma";
import AlternativaEnviada from '../types/DTOs/answer-census';
import AnswerCensusDTO, { AlternativasSubmissao } from "../types/DTOs/answer-census";
import StatusCensusDTO from '../types/DTOs/census-status';
import CreateCensusDTO from "../types/DTOs/create-census";
import ConflictionError from "../types/errors/ConflictionError";
import NotFoundError from '../types/errors/NotFoundError';
import ValidationError from "../types/errors/ValidationError";

export default class CensusService {
  constructor() {
  }

  async createCensus(dto: CreateCensusDTO) {

    console.log('criando...', dto)
    await prismaClient.censo.create({
      data: {
        title: dto.title,
        description: dto.description,
        visivel: dto.visible ?? false,
        questions: {
          create: dto.questions.map(question => ({
            text: question.text,
            options: {
              createMany: {
                data: question.options.map(option => ({
                  text: option.text
                }))
              }
            }
          }))
        }
      },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    })
  }

  async getStats(id: number) {
    const user = await prismaClient.usuario.findUnique({
      where: { id }
    })

    if(user?.role === 'USER') {
      const census = await prismaClient.censo.findMany({
        where: { visivel: true },
        include: {
          _count: {
            select: {
              Submissao: {
                where: {
                  idUsuario: id
                }
              },
              questions: true
            }
          }
        }
      })

      let dto: StatusCensusDTO[] = []

      census.forEach(item => {
        dto.push({
          ...item,
          description: item.description || undefined,
          questions: item._count.questions,
          submitted: item._count.Submissao !== 0

        })
      });

      return dto
    }
  }

  async getCensusById(id: number) {
    const censo = await prismaClient.censo.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    })

    return censo
  }

  async getCensusTcleById(idCenso: number) {
    const tcle = await prismaClient.tcle.findFirst({
      where: { idCenso }
    })

    if (tcle === null) throw new NotFoundError(`Tcle from census with id ${idCenso} not found`)

    return tcle.text
  }

  async answerCensus(
    idUsuario: number,
    idCenso: number,
    alternativasEnviadas: AlternativaEnviada[]
  ) {
    const jaSubmeteu = await prismaClient.submissao.findUnique({
      where: { idCenso_idUsuario: { idCenso, idUsuario } }
    })

    if (jaSubmeteu) throw new ConflictionError('O usuário já respondeu esse censo')

    const submissionId = crypto.randomBytes(16).toString("hex");
    const questionsCenso = await prismaClient.pergunta.findMany({
      where: { idCenso },
      include: { options: true }
    })

    let alternativas: AlternativasSubmissao[] = []

    questionsCenso.forEach(pergunta => {
      const filtro = alternativasEnviadas.filter(alternativaEnviada => (
        pergunta.options.find(alternativaPergunta => (
          alternativaPergunta.id === alternativaEnviada.optionId
        ))
      ))

      if (filtro.length === 0)
        throw new ValidationError('Pergunta está faltando')

      if (pergunta.type === 'UNICA' && filtro.length !== 1)
        throw new ValidationError('Pergunta foi enviada duas vezes')

      if (pergunta.type === 'TEXTO' && (filtro.length !== 1 || filtro[0].resposta === undefined))
        throw new ValidationError('Pergunta com campo de texto enviada em branco')

      alternativas.push.apply(alternativas, filtro.map(alt => ({ ...alt, submissionId })))
    });

    await prismaClient.resultado.createMany({ data: alternativas })
    await prismaClient.submissao.create({ data: { idCenso, idUsuario } })
  }
}
