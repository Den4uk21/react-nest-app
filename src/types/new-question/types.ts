export interface INewQuestion {
  title: string,
  descriptions: string,
  categories: string[]
}

export interface IChangeQuestion extends INewQuestion {
  questionId: string
}