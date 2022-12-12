interface AnswerCensusDTO {
  resultado: AlternativasEnviadas[]
}

type AlternativasEnviadas = {
  optionId: number
  resposta?: string
}

export type AlternativasSubmissao = {
  optionId: number
  resposta?: string
  submissionId: string
}

export default AnswerCensusDTO
