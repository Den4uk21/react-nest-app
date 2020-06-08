import React from 'react'

import { QuestionsListContainer } from '../../containers/question/questionsListContainer'
import { FilterContainer } from '../../containers/filter/filterContainer'
import { QuestionPaginationContainer } from '../../containers/pagination/questionPaginationContainer'

import './styles.sass'

const MainPage: React.FC = () => {
  return (
    <main className="main-page">
      <FilterContainer />
      <QuestionsListContainer />
      <QuestionPaginationContainer />
    </main>
  )
}

export default MainPage