import { NewQuestionUrls } from '../../types/new-question/constants'
import { ContentType } from '../assets/utils'

import { fetchWithAuth } from '../assets/authApi'
import { INewQuestion } from '../../types/new-question/types'

export const newQuestionsApi = async ({ title, descriptions, categories = ['All'] }: INewQuestion) => {
  const data = await fetchWithAuth(NewQuestionUrls.newQuestionURL, {
    method: 'POST',
    headers: {
      'Content-type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify({ title, descriptions, categories })
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}