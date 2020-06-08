import { QuestionAnswerUrls } from '../../types/question-answer/constants'
import { IGetAnswers } from '../../types/question-answer/types'
import { fetchWithAuth } from '../assets/authApi'

export const getQuestionInfoApi = async (questionId: string) => {
  const data = await fetch(QuestionAnswerUrls.getQuestionInfoURL + questionId)

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const getAnswersApi = async ({ questionId, page = 1 }: IGetAnswers) => {
  const data = await fetch(QuestionAnswerUrls.getAnswersURL + questionId + `?page=${page}`)

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const updateRatingApi = async (answerId: string) => {
  const data = await fetchWithAuth(QuestionAnswerUrls.updateRatingURL + answerId, {
    method: 'PUT'
  })

  if(data) {
    return {
      status: await data.status,
      data: await data.json()
    }
  }
}