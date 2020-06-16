import { BE_APP_URL } from '../constants'

const getQuestionInfoURL = `${BE_APP_URL}/questions/`
const getAnswersURL = `${BE_APP_URL}/answers/`
const updateRatingURL = `${BE_APP_URL}/answers/update-rating/`
const newAnswerURL = (questionId: string) => `${BE_APP_URL}/answers/${questionId}/new`

export const QuestionAnswerUrls = {
  getQuestionInfoURL,
  getAnswersURL,
  updateRatingURL,
  newAnswerURL
}