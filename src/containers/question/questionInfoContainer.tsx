import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { QuestionInfo } from '../../components/question/questionInfo'

import { QuestionAnswerActions } from '../../redux/question-answer/actions'
import { IRootReducer } from '../../redux/store/rootReducer'

export const QuestionInfoContainer: React.FC = () => {
  const dispatch = useDispatch()
  const questionInfo = useSelector((state: IRootReducer) => state.question_answer.questionsInfo)
  const { questionId } = useParams()

  useEffect(() => {
    dispatch(QuestionAnswerActions.getQuestionInfo(questionId))
  }, [dispatch, questionId])

  return (
    <>
      {questionInfo ? (
        <QuestionInfo {...questionInfo} />
      ) : <></>}
    </>
  )
}