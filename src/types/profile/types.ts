import { ILinkQuestionResponse } from '../main/types'

export interface IProfileState {
  profileInfo: IProfile | null,
  questionsWithAnswers: ILinkQuestionResponse | null,
  questionsNoAnswers: ILinkQuestionResponse | null
}

export interface IProfile {
  avatarUrl: string,
  userName: string,
  email: string,
  motto: string | null,
  bio: string | null,
  status: string
}

export interface IGetUserQuestions {
  userName: string,
  page?: number
}