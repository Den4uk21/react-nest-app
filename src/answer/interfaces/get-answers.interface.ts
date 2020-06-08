export interface IGetAnswer {
  id: string,
  answer: string,
  isAnswer: boolean,
  rating: number,
  date: string,
  userName: string,
  avatarUrl: string
}

export interface IGetAnswerResponse {
  answersList: IGetAnswer[],
  amount: number
}