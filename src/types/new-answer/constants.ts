import { BE_APP_URL } from '../constants'

const updateRatingURL = `${BE_APP_URL}/answers/update-rating/`
const newAnswerURL = (questionId: string) => `${BE_APP_URL}/answers/${questionId}/new`
const isAnswerURL = (questionId: string, answerId: string) => `${BE_APP_URL}/answers/${questionId}/is-answer/${answerId}`

export const NewAnswerUrls = {
  updateRatingURL,
  newAnswerURL,
  isAnswerURL
}