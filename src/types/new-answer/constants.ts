const updateRatingURL = (answerId: string) => `/answers/update-rating/${answerId}`
const newAnswerURL = (questionId: string) => `/answers/${questionId}/new`
const isAnswerURL = (questionId: string, answerId: string) => `/answers/${questionId}/is-answer/${answerId}`

export const NewAnswerUrls = {
  updateRatingURL,
  newAnswerURL,
  isAnswerURL
}