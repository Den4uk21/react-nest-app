import React from 'react'
import { useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { NewAnswer } from '../../components/answer/newAnswer'
import { NewAnswerActions } from '../../redux/new-answer/actions'

export const NewAnswerContainer: React.FC = () => {
  const dispatch = useDispatch()
  const { questionId } = useParams()

  const onSubmitValues = (answer: string) => {
    dispatch(NewAnswerActions.newAnswer({ questionId, answer }))
  }

  return (
    <NewAnswer onSubmitValues={onSubmitValues} />
  )
}