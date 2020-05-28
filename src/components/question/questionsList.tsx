import React from 'react'
import { Question } from './question'

import { ILinkQuestion } from '../../types/main/types'
import './styles.sass'

interface IQuestionsListProps {
  questionsList: ILinkQuestion[]
}

export const QuestionsList: React.FC<IQuestionsListProps> = ({ questionsList }) => {
  return (
    <section className="questions-list">
      <h2 className="title">Questions:</h2>
      
      <ul>
        {questionsList.map((question) => (
          <li key={question.id}>
            <Question {...question} />
          </li>
        ))}
      </ul>
    </section>
  )
}