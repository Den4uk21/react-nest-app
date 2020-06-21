export interface INewAnswer {
  questionId: string,
  answer: string
}

export interface IChangeAnswer {
  answerId: string,
  answer: string
}

export interface IIsAnswer {
  questionId: string,
  answerId: string
}