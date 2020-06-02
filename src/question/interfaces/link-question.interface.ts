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