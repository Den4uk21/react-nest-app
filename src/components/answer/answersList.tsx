import React, { useState } from 'react'
import { Answer } from './answer'

import { AuthWarningModal } from '../modals/authWarningModal'
import { IAnswer } from '../../types/question-answer/types'

import './styles.sass'

interface IAnswersListProps {
  answersList: IAnswer[],
  updateRating: (answerId: string) => void
}

export const AnswersList: React.FC<IAnswersListProps> = ({ answersList, updateRating }) => {
  const [visibleWarning, setVisibleWarning] = useState<boolean>(false)
  const isAuth = localStorage.getItem('auth_tokens')

  const confirmedAnswersList = answersList.filter((answer) => answer.isAnswer === true)
  const notConfirmedAnswersList = answersList.filter((answer) => answer.isAnswer === false)

  const onIncreaseRating = (answerId: string) => {
    if(isAuth) {
      updateRating(answerId)
    }else {
      setVisibleWarning(true)
    }
  }

  return (
    <section className="answers-list">
      <h2 className="title">Answers:</h2>

      <ul className="answers-list confirm">
        {confirmedAnswersList.map((answer) => (
          <li key={answer.id}>
            <Answer {...answer} onIncreaseRating={onIncreaseRating} />
          </li>
        ))}
      </ul>

      <hr />

      <ul className="answers-list">
        {notConfirmedAnswersList.map((answer) => (
          <li key={answer.id}>
            <Answer {...answer} onIncreaseRating={onIncreaseRating} />
          </li>
        ))}
      </ul>

      <AuthWarningModal visible={visibleWarning} setVisible={setVisibleWarning} />
    </section>
  )
}