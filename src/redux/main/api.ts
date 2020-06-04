import { MainUrls } from '../../types/main/constants'
import { ContentType } from '../assets/utils'

import { IFilterQuestions } from '../../types/main/types'

export const getAllQuestionsApi = async ({ type = 'new', categories, page = '1' }: IFilterQuestions) => {
  const data = await fetch(MainUrls.getAllQuestionsURL + `?page=${page}`, {
    method: 'POST',
    headers: {
      'Content-type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify({ type, categories: categories ? categories.split(',') : null })
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}