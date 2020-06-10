import { ProfileUrls } from '../../types/profile/constants'
import { IGetUserQuestions } from '../../types/profile/types'

export const getProfileApi = async (userName: string) => {
  const data = await fetch(ProfileUrls.getProfileURL + userName)

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const getUserQuestionsWithAnswersApi = async ({ userName, page = 1 }: IGetUserQuestions) => {
  const data = await fetch(ProfileUrls.getUserQuestionsWithAnswersURL(userName) + `?page=${page}`)

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const getUserQuestionsNoAnswersApi = async ({ userName, page = 1 }: IGetUserQuestions) => {
  const data = await fetch(ProfileUrls.getUserQuestionsNoAnswersURL(userName) + `?page=${page}`)

  return {
    status: await data.status,
    data: await data.json()
  }
}