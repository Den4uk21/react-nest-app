import { QuestionAnswerUrls } from '../../types/question-answer/constants'
import { IGetAnswers } from '../../types/question-answer/types'

export const getQuestionInfoApi = async (questionId: string) => {
  const data = await fetch(QuestionAnswerUrls.getQuestionInfoURL(questionId))

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const getAnswersApi = async ({ questionId, page = 1 }: IGetAnswers) => {
  const data = await fetch(QuestionAnswerUrls.getAnswersListURL(questionId, page))

  return {
    status: await data.status,
    data: await data.json()
  }
}