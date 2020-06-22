import { MainUrls } from '../../types/main/constants'
import { ContentType } from '../assets/utils'

import { IFilterQuestions } from '../../types/main/types'

export const getAllQuestionsApi = async ({ type, categories, page = 1 }: IFilterQuestions) => {
  const validCategories = categories?.length === 0 ? null : categories

  const data = await fetch(MainUrls.getAllQuestionsURL(page), {
    method: 'POST',
    headers: {
      'Content-type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify({ type, categories: validCategories })
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}