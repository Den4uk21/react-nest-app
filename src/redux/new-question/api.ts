import { NewQuestionUrls } from '../../types/new-question/constants'
import { ContentType } from '../assets/utils'

import { fetchWithAuth } from '../assets/authApi'
import { INewQuestion, IChangeQuestion } from '../../types/new-question/types'
import { QuestionAnswerUrls } from '../../types/question-answer/constants'

export const newQuestionsApi = async ({ title, descriptions, categories }: INewQuestion) => {
  const validCategories = !categories || categories.length === 0 ? ['All'] : categories

  const data = await fetchWithAuth(NewQuestionUrls.newQuestionURL, {
    method: 'POST',
    headers: {
      'Content-type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify({ title, descriptions, categories: validCategories })
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const changeQuestionApi = async ({ questionId, title, descriptions, categories }: IChangeQuestion) => {
  const validCategories = !categories || categories.length === 0 ? ['All'] : categories

  const data = await fetchWithAuth(QuestionAnswerUrls.getQuestionInfoURL(questionId), {
    method: 'PUT',
    headers: {
      'Content-Type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify({ title, descriptions, categories: validCategories })
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const deleteQuestionApi = async (questionId: string) => {
  const data = await fetchWithAuth(QuestionAnswerUrls.getQuestionInfoURL(questionId), {
    method: 'DELETE'
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}