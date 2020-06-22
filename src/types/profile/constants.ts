import { BE_APP_URL } from '../constants'

const getProfileURL = (userName: string) => `${BE_APP_URL}/profile/${userName}`
const getUserQuestionsWithAnswersURL = (userName: string, page: number) => `${BE_APP_URL}/questions/${userName}/with-answers?page=${page}`
const getUserQuestionsNoAnswersURL = (userName: string, page: number) => `${BE_APP_URL}/questions/${userName}/no-answers?page=${page}`

export const ProfileUrls = {
  getProfileURL,
  getUserQuestionsWithAnswersURL,
  getUserQuestionsNoAnswersURL
}