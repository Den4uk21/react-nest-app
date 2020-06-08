export interface IQuestionAnswerState {
  questionsInfo: IQuestion | null,
  answers: IGetAnswerResponse
}

export interface IQuestion {
  id: string,
  title: string,
  descriptions: string,
  categories: string[],
  date: string,
  userName: string,
  avatarUrl: string
}

export interface IAnswer {
  id: string,
  answer: string,
  isAnswer: boolean,
  rating: number,
  date: string,
  userName: string,
  avatarUrl: string
}

export interface IGetAnswerResponse {
  answersList: IAnswer[],
  amount: number
}

export interface IGetAnswers {
  questionId: string,
  page?: number
}