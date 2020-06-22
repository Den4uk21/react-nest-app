import React from 'react'

import { QuestionInfoContainer } from '../../containers/question/questionInfoContainer'
import { NewAnswerContainer } from '../../containers/answer/newAnswerContainer'
import { AnswersListContainer } from '../../containers/answer/answersListContainer'
import { AnswerPaginationContainer } from '../../containers/pagination/answerPaginationContainer'

import './styles.sass'

const QuestionAnswerPage: React.FC = () => {
  const isAuth = localStorage.auth_tokens 

  return (
    <main className="question-answer-page">
      <QuestionInfoContainer />
      {isAuth ? <NewAnswerContainer /> : <></>}
      <AnswersListContainer />
      <AnswerPaginationContainer />
    </main>
  )
}

export default QuestionAnswerPage