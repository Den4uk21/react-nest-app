import React from 'react'

import { QuestionInfoContainer } from '../../containers/question/questionInfoContainer'
import { AnswersListContainer } from '../../containers/answer/answersListContainer'
import { AnswerPaginationContainer } from '../../containers/pagination/answerPaginationContainer'

import './styles.sass'

const QuestionAnswerPage: React.FC = () => {
  return (
    <main className="question-answer-page">
      <QuestionInfoContainer />
      <AnswersListContainer />
      <AnswerPaginationContainer />
    </main>
  )
}

export default QuestionAnswerPage