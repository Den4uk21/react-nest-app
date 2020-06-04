import React from 'react'

import { QuestionInfoContainer } from '../../containers/question/questionInfoContainer'
import { AnswersListContainer } from '../../containers/answer/answersListContainer'

import './styles.sass'

const QuestionAnswerPage: React.FC = () => {
  return (
    <main className="question-answer-page">
      <QuestionInfoContainer />
      <AnswersListContainer />
    </main>
  )
}

export default QuestionAnswerPage