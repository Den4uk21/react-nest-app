import React from 'react'

import { QuestionInfoContainer } from '../../containers/question/questionInfoContainer'
import { NewAnswerContainer } from '../../containers/answer/newAnswerContainer'
import { AnswersListContainer } from '../../containers/answer/answersListContainer'
import { AnswerPaginationContainer } from '../../containers/pagination/answerPaginationContainer'

import './styles.sass'

const QuestionAnswerPage: React.FC = () => {
  return (
    <main className="question-answer-page">
      <QuestionInfoContainer />
      <NewAnswerContainer />
      <AnswersListContainer />
      <AnswerPaginationContainer />
    </main>
  )
}

export default QuestionAnswerPage