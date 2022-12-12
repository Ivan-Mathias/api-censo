interface StatusCensusDTO {
  id: number
  title: string
  description?: string
  date: Date
  submitted: boolean
  questions: number
}

export default StatusCensusDTO
