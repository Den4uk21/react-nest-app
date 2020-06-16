import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { NewAnswer } from '../../components/answer/newAnswer'
import { QuestionAnswerActions } from '../../redux/question-answer/actions'

export const NewAnswerContainer: React.FC = () => {
  const dispatch = useDispatch()
  const { questionId } = useParams()

  const onSubmitValues = (answer: string) => {
    dispatch(QuestionAnswerActions.newAnswer({ questionId, answer }))
    dispatch(QuestionAnswerActions.getAnswers({ questionId }))
  }

  return (
    <NewAnswer onSubmitValues={onSubmitValues} />
  )
}