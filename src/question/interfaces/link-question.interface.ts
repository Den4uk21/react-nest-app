export interface ILinkQuestion {
  id: string,
  title: string,
  categories: string[],
  answersAmount: number,
  date: string
}

export interface ILinkQuestionResponse {
  questionsList: ILinkQuestion[],
  amount: number
}