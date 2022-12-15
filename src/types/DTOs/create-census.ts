import { TipoPergunta } from '@prisma/client';

interface CreateCensusDTO {
  title: string
  description?: string
  visible?: boolean
  questions: {
    text: string,
    type: TipoPergunta,
    mandatory: boolean,
    options: {
      text: string
    }[]
  }[]
}

export default CreateCensusDTO
