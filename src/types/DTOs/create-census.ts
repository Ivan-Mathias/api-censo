interface CreateCensusDTO {
  title: string
  description?: string
  visible?: boolean
  questions: {
    text: string
    options: {
      text: string
    }[]
  }[]
}

export default CreateCensusDTO
