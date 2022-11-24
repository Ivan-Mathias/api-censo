interface AnswerCensusDTO {
  idCenso: number
  resultado: AlternativasEnviadas[]
}

type AlternativasEnviadas = {
  idAlternativa: number
  resposta?: string
}

export type AlternativasSubmissao = {
  idAlternativa: number
  resposta?: string
  idSubmissao: string
}

export default AnswerCensusDTO
