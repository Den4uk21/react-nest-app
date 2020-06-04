import { BE_APP_URL } from '../constants'

const getQuestionInfoURL = `${BE_APP_URL}/questions/`
const getAnswersURL = `${BE_APP_URL}/answers/`

export const QuestionAnswerUrls = {
  getQuestionInfoURL,
  getAnswersURL
}