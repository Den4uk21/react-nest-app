import React from 'react'
import { useSelector } from 'react-redux'

import { QuestionsList } from '../../components/question/questionsList'
import { IRootReducer } from '../../redux/store/rootReducer'

export const QuestionsListContainer: React.FC = () => {
  const questionsList = useSelector((state: IRootReducer) => state.main.questions.questionsList)

  return (
    <QuestionsList questionsList={questionsList} />
  )
}