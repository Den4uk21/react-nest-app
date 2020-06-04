import { QuestionAnswerUrls } from '../../types/question-answer/constants'

export const getQuestionInfoApi = async (questionId: string) => {
  const data = await fetch(QuestionAnswerUrls.getQuestionInfoURL + questionId)

  return {
    status: await data.status,
    data: await data.json()
  }
}

export const getAnswersApi = async (questionId: string) => {
  const data = await fetch(QuestionAnswerUrls.getAnswersURL + questionId)

  return {
    status: await data.status,
    data: await data.json()
  }
}