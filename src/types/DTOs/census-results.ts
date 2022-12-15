type formResultsView = {
  id: number,
  title: string,
  description?: string,
  questions: formResultsQuestion[]
}

export type formResultsQuestion = {
  id: number,
  text: string,
  type: "UNICA" | "MULTIPLA",
  answers: number,
  options: formResultsQuestionAlternative[]
  mandatory: boolean
}

type formResultsQuestionAlternative = {
  id: number,
  text: string,
  _count: {
    answer: number
  }
}

export default formResultsView
