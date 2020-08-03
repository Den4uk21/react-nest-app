const getQuestionInfoURL = (questionId: string) => `/questions/${questionId}`
const getAnswersURL = (answerId: string) => `/answers/${answerId}`
const getAnswersListURL = (questionId: string, page: number) => `/answers/${questionId}?page=${page}`

export const QuestionAnswerUrls = {
  getQuestionInfoURL,
  getAnswersURL,
  getAnswersListURL
}