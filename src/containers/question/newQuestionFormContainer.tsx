import React from 'react'
import { useDispatch } from 'react-redux'

import { NewQuestionForm } from '../../components/question/newQuestionForm'
import { INewQuestion } from '../../types/new-question/types'
import { NewQuestionActions } from '../../redux/new-question/actions'

export const NewQuestionFormContainer: React.FC = () => {
  const dispatch = useDispatch()

  const onSubmitValues = (values: INewQuestion) => {
    dispatch(NewQuestionActions.newQuestion(values))
  }

  return (
    <NewQuestionForm onSubmitValues={onSubmitValues} />
  )
}