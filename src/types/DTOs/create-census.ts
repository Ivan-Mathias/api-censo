interface CreateCensusDTO {
  name: string
  visible?: boolean
  questions: {
    text: string
    options: {
      text?: string
    }[]
  }[]
}

export default CreateCensusDTO
