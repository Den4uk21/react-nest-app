import { BE_APP_URL } from '../constants'

const getProfileURL = `${BE_APP_URL}/profile/`
const getUserQuestionsWithAnswersURL = (userName: string) => `${BE_APP_URL}/questions/${userName}/with-answers`
const getUserQuestionsNoAnswersURL = (userName: string) => `${BE_APP_URL}/questions/${userName}/no-answers`

export const ProfileUrls = {
  getProfileURL,
  getUserQuestionsWithAnswersURL,
  getUserQuestionsNoAnswersURL
}