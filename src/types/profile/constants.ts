const getProfileURL = (userName: string) => `/profile/${userName}`
const getUserQuestionsWithAnswersURL = (userName: string, page: number) => `/questions/${userName}/with-answers?page=${page}`
const getUserQuestionsNoAnswersURL = (userName: string, page: number) => `/questions/${userName}/no-answers?page=${page}`

export const ProfileUrls = {
  getProfileURL,
  getUserQuestionsWithAnswersURL,
  getUserQuestionsNoAnswersURL
}