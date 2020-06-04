import React from 'react'
import { Answer } from './answer'

import { IGetAnswer } from '../../types/question-answer/types'
import './styles.sass'

interface IAnswersListProps {
  answersList: IGetAnswer[]
}

export const AnswersList: React.FC<IAnswersListProps> = ({ answersList }) => {
  const confirmedAnswersList = answersList.filter((answer) => answer.isAnswer === true)
  const notConfirmedAnswersList = answersList.filter((answer) => answer.isAnswer === false)

  return (
    <section className="answers-list">
      <h2 className="title">Answers:</h2>

      <ul className="answers-list confirm">
        {confirmedAnswersList.map((answer) => (
          <li key={answer.id}>
            <Answer {...answer} />
          </li>
        ))}
      </ul>

      <hr />

      <ul className="answers-list">
        {notConfirmedAnswersList.map((answer) => (
          <li key={answer.id}>
            <Answer {...answer} />
          </li>
        ))}
      </ul>
    </section>
  )
}