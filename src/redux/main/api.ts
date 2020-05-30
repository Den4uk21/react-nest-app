import { MainUrls } from '../../types/main/constants'
import { ContentType } from '../assets/utils'

import { IFilterQuestions } from '../../types/main/types'

export const getAllQuestionsApi = async (payload: IFilterQuestions) => {
  const data = await fetch(MainUrls.getAllQuestionsURL + `?page=${1}`, {
    method: 'POST',
    headers: {
      'Content-type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify(payload)
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}