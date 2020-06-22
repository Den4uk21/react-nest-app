import { BE_APP_URL } from '../constants'

const getQuestionInfoURL = (questionId: string) => `${BE_APP_URL}/questions/${questionId}`
const getAnswersURL = (answerId: string) => `${BE_APP_URL}/answers/${answerId}`
const getAnswersListURL = (questionId: string, page: number) => `${BE_APP_URL}/answers/${questionId}?page=${page}`

export const QuestionAnswerUrls = {
  getQuestionInfoURL,
  getAnswersURL,
  getAnswersListURL
}