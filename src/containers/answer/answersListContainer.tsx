import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { AnswersList } from '../../components/answer/answersList'

import { NewAnswerActions } from '../../redux/new-answer/actions'
import { QuestionAnswerActions } from '../../redux/question-answer/actions'
import { IRootReducer } from '../../redux/store/rootReducer'

export const AnswersListContainer: React.FC = () => {
  const dispatch = useDispatch()
  const answersList = useSelector((state: IRootReducer) => state.question_answer.answers.answersList)
  const { questionId } = useParams()

  useEffect(() => {
    dispatch(QuestionAnswerActions.getAnswers({ questionId }))
  }, [dispatch, questionId])

  const updateRating = (answerId: string) => {
    dispatch(NewAnswerActions.updateRating(answerId))
    dispatch(QuestionAnswerActions.getAnswers({ questionId }))
  }

  return (
    <AnswersList answersList={answersList} updateRating={updateRating} />
  )
}