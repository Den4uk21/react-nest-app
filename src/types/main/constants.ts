import { BE_APP_URL } from '../constants'

const getAllQuestionsURL = (page: number) => `${BE_APP_URL}/questions/all?page=${page}`

export const MainUrls = {
  getAllQuestionsURL
}