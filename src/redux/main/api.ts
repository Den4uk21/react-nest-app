import { MainUrls } from '../../types/main/constants'

export const getAllQuestionsApi = async () => {
  const data = await fetch(MainUrls.getAllQuestionsURL)

  return {
    status: await data.status,
    data: await data.json()
  }
}