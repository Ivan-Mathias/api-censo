import { TipoPergunta } from '@prisma/client';

interface CreateCensusDTO {
  id?: number
  title: string
  description?: string
  tcle?: string
  publish?: boolean
  questions: {
    id?: number
    text: string
    type: TipoPergunta
    mandatory: boolean
    options: {
      id?: number
      text: string
    }[]
  }[]
}

export default CreateCensusDTO
