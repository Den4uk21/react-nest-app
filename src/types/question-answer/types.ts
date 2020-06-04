export interface IQuestionAnswerState {
  questionsInfo: IGetQuestion | null,
  answersList: IGetAnswer[],
  loading: boolean
}

export interface IGetQuestion {
  id: string,
  title: string,
  descriptions: string,
  categories: string[],
  date: string,
  userName: string,
  avatarUrl: string
}

export interface IGetAnswer {
  id: string,
  answer: string,
  isAnswer: boolean,
  date: string,
  userName: string,
  avatarUrl: string
}