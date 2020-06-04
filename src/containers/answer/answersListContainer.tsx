import React from 'react'
import { useSelector } from 'react-redux'

import { AnswersList } from '../../components/answer/answersList'
import { IRootReducer } from '../../redux/store/rootReducer'

export const AnswersListContainer: React.FC = () => {
  const answersList = useSelector((state: IRootReducer) => state.question_answer.answersList)

  return (
    <AnswersList answersList={answersList} />
  )
}