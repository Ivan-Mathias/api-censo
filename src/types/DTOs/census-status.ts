interface StatusCensusDTO {
  id: number
  title: string
  datePublished?: Date
  dateClosed?: Date
  dateAnswered?: Date
  lastUpdated?: Date
  answers?: number
  questions: number
}

export default StatusCensusDTO
