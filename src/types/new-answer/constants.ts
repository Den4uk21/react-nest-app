import { BE_APP_URL } from '../constants'

const updateRatingURL = `${BE_APP_URL}/answers/update-rating/`
const newAnswerURL = (questionId: string) => `${BE_APP_URL}/answers/${questionId}/new`

export const NewAnswerUrls = {
  updateRatingURL,
  newAnswerURL
}