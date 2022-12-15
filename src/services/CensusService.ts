import crypto from 'crypto'
import prismaClient from "../config/prisma";
import AlternativaEnviada, {AlternativasSubmissao} from '../types/DTOs/answer-census';
import StatusCensusDTO from '../types/DTOs/census-status';
import CreateCensusDTO from "../types/DTOs/create-census";
import ResultsCensusDTO from "../types/DTOs/census-results";
import ConflictionError from "../types/errors/ConflictionError";
import NotFoundError from '../types/errors/NotFoundError';
import ValidationError from "../types/errors/ValidationError";
import ForbiddenError from "../types/errors/ForbiddenError";

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

      let dto: StatusCensusDTO[] = []

      census.forEach(item => {
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

    if (user?.role === 'ADMIN') {
      const census = await prismaClient.censo.findMany({
        include: {
          _count: {
            select: {
              questions: true,
              DataResposta: true
            }
          }
        }
      })
      let dto: StatusCensusDTO[] = []

      census.forEach(item => {
        dto.push({
          id: item.id,
          title: item.title,
          datePublished: item.datePublished || undefined,
          dateClosed: item.dateClosed || undefined,
          lastUpdated: item.lastUpdated,
          questions: item._count.questions,
          answers: item._count.DataResposta
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

  async getResultsById(idUsuario: number, idCenso: number) {
    const user = await prismaClient.usuario.findUnique({
      where: {id: idUsuario},
    })

    if (user?.role !== 'ADMIN') throw new ForbiddenError('Usuário não é administrador')

    const censo = await prismaClient.censo.findUnique({
      where: {id: idCenso},
      include: {
        questions: {
          include: {
            options: {
              include: {
                _count: {
                  select: {
                    answer: true
                  }
                },
                answer: true
              }
            }
          }
        }
      }
    })

    if (censo === null) throw new NotFoundError(`Censo with id ${idCenso} not found`)

    let dto: ResultsCensusDTO = {
      id: censo.id,
      title: censo.title,
      description: censo.description || undefined,
      questions: censo.questions.map(question => ({
        id: question.id,
        text: question.text,
        type: question.type,
        answers: (() => {
          let submissions = new Set();
          question.options.forEach(option => {
            option.answer.forEach(answer => {
              submissions.add(answer.submissionId)
            })
          })
          return submissions.size
        })(),
        mandatory: question.mandatory,
        options: question.options.map(option => ({
          id: option.id,
          text: option.text,
          _count: {answer: option._count.answer},
        }))
      }))
    }

    return dto
  }

  async answerCensus(
    idUsuario: number,
    idCenso: number,
    alternativasEnviadas: AlternativaEnviada[]
  ) {
    const jaSubmeteu = await prismaClient.dataResposta.findUnique({
      where: { idUser_idCenso: { idUser: idUsuario, idCenso } }
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

      alternativas.push.apply(alternativas, filtro.map(alt => ({ ...alt, submissionId })))
    });

    await prismaClient.resultado.createMany({ data: alternativas })
    await prismaClient.dataResposta.create({ data: { idCenso, idUser: idUsuario, date: new Date() } })
  }

  async closeCensus(idUser: number, idCenso: number) {
    const user = await prismaClient.usuario.findUnique({
      where: {id: idUser},
    })

    if (user?.role !== 'ADMIN') throw new ForbiddenError('Usuário não é administrador')

    const censo = await prismaClient.censo.findUnique({
      where: { id: idCenso },
    })

    if (censo === null) throw new NotFoundError(`Censo with id ${idCenso} not found`)
    if (censo.dateClosed !== null) throw new ConflictionError(`Censo with id ${idCenso} is already closed`)

    return await prismaClient.censo.update({
      where: {
        id: idCenso
      },
      data: {
        dateClosed: new Date()
      }
    })
  }
}
