export interface IMainState {
  questions: ILinkQuestionResponse,
  filter: IFilterQuestions
}

export interface ILinkQuestion {
  id: string,
  title: string,
  categories: string[],
  date: string,
  answersAmount: number
}

export interface ILinkQuestionResponse {
  questionsList: ILinkQuestion[],
  amount: number
}

export interface IFilterQuestions {
  type?: string,
  categories?: string[],
  page?: number
}