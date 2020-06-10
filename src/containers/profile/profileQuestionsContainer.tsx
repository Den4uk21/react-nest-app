import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'

import { ProfileQuestions } from '../../components/profile/profileQuestions'

import { IRootReducer } from '../../redux/store/rootReducer'
import { ProfileActions } from '../../redux/profile/actions'

export const ProfileQuestionsContainer: React.FC = () => {
  const dispatch = useDispatch()
  const questionsWithAnswers = useSelector((state: IRootReducer) => state.profile.questionsWithAnswers)
  const questionsNoAnswers = useSelector((state: IRootReducer) => state.profile.questionsNoAnswers)
  const { userName } = useParams()

  useEffect(() => {
    dispatch(ProfileActions.getUserQuestionsWithAnswers({ userName }))
    dispatch(ProfileActions.getUserQuestionsNoAnswers({ userName }))
  }, [dispatch, userName])

  const onPageChangeWithAnswer = (page: number) => {
    dispatch(ProfileActions.getUserQuestionsWithAnswers({ userName, page }))
  }

  const onPageChangeNoAnswer = (page: number) => {
    dispatch(ProfileActions.getUserQuestionsNoAnswers({ userName, page }))
  }

  return (
    <>
      {questionsWithAnswers && questionsNoAnswers ? (
        <ProfileQuestions 
          questionsWithAnswers={questionsWithAnswers} 
          questionsNoAnswers={questionsNoAnswers} 
          onPageChangeNoAnswer={onPageChangeNoAnswer}
          onPageChangeWithAnswer={onPageChangeWithAnswer}
        />
      ): <></>}
    </>
  )
}