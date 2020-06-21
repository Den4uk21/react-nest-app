import { QuestionAnswerUrls } from '../../types/question-answer/constants'
import { NewAnswerUrls } from '../../types/new-answer/constants'
import { fetchWithAuth } from '../assets/authApi'
import { ContentType } from '../assets/utils'
import { INewAnswer, IChangeAnswer, IIsAnswer } from '../../types/new-answer/types'

export const newAnswerApi = async ({ questionId, answer }: INewAnswer) => {
  const data = await fetchWithAuth(NewAnswerUrls.newAnswerURL(questionId), {
    method: 'POST',
    headers: {
      'Content-Type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify({ answer })
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const updateRatingApi = async (answerId: string) => {
  const data = await fetchWithAuth(NewAnswerUrls.updateRatingURL + answerId, {
    method: 'PUT'
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const changeAnswerApi = async ({ answerId, answer }: IChangeAnswer) => {
  const data = await fetchWithAuth(QuestionAnswerUrls.getAnswersURL + answerId, {
    method: 'PUT',
    headers: {
      'Content-Type': ContentType.APPLICATION_JSON
    },
    body: JSON.stringify({ answer })
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const deleteAnswersApi = async (answerId: string) => {
  const data = await fetchWithAuth(QuestionAnswerUrls.getAnswersURL + answerId, {
    method: 'DELETE'
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const isAnswersApi = async ({ questionId, answerId }: IIsAnswer) => {
  const data = await fetchWithAuth(NewAnswerUrls.isAnswerURL(questionId, answerId), {
    method: 'PUT'
  })

  return {
    status: await data.status,
    data: await data.json()
  }
}