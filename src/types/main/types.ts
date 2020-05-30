export interface IMainState {
  questionsList: ILinkQuestion[]
}

export interface ILinkQuestion {
  id: string,
  title: string,
  categories: string[],
  date: string
}

export interface IFilterQuestions {
  type: string,
  categories?: string[]
}