export interface IMainState {
  questions: ILinkQuestionResponse,
  loading: boolean
}

export interface ILinkQuestion {
  id: string,
  title: string,
  categories: string[],
  date: string
}

export interface ILinkQuestionResponse {
  questionsList: ILinkQuestion[],
  amount: number
}

export interface IFilterQuestions {
  type: string,
  categories: string,
  page: string
}