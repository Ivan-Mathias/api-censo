import crypto from 'crypto'
import prismaClient from "../config/prisma";
import AlternativaEnviada, {AlternativasSubmissao} from '../types/DTOs/answer-census';
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
        datePublished: dto.publish ? new Date() : null,
        questions: {
          create: dto.questions.map(question => ({
            text: question.text,
            type: question.type,
            mandatory: question.mandatory,
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

  async getCensusList(id: number) {
    const user = await prismaClient.usuario.findUnique({
      where: {id},
    })

    if (user?.role === 'USER') {
      const census = await prismaClient.censo.findMany({
        where: {
          OR: [
            {
              datePublished: {not: null},
              dateClosed: {equals: null},
            },
            {
              dateClosed: {not: null},
              DataResposta: {
                some: {
                  AND: {
                    date: {not: undefined},
                    idUser: id
                  }
                }
              }
            }
          ]
        },
        include: {
          DataResposta: {
            select: {
              date: true
            },
            where: {
              idUser: id
            }
          },
          _count: {
            select: {
              questions: true
            }
          }
        }
      })

      console.log(census);

      let dto: StatusCensusDTO[] = []

      census.forEach(item => {
        console.log(item.DataResposta[0])
        dto.push({
          id: item.id,
          title: item.title,
          datePublished: item.datePublished || undefined,
          dateClosed: item.dateClosed || undefined,
          dateAnswered: item.DataResposta[0]?.date || undefined,
          lastUpdated: item.lastUpdated,
          questions: item._count.questions
        })
      });

      return dto
    }

  }

  async getCensusById(id: number) {
    return await prismaClient.censo.findUnique({
      where: {id},
      include: {
        questions: {
          include: {
            options: true
          }
        }
      }
    })
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
