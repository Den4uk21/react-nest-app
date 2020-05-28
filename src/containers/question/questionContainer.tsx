import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { QuestionsList } from '../../components/question/questionsList'
import { MainActions } from '../../redux/main/actions'

import { IRootReducer } from '../../redux/store/rootReducer'

export const QuestionContainer: React.FC = () => {
  const dispatch = useDispatch()
  const questionsList = useSelector((state: IRootReducer) => state.main.questionsList)

  useEffect(() => {
    dispatch(MainActions.getAllQuestions())
  }, [dispatch])

  return (
    <QuestionsList questionsList={questionsList} />
  )
}