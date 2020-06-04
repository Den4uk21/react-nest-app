import React from 'react'

import { QuestionsListContainer } from '../../containers/question/questionsListContainer'
import { FilterContainer } from '../../containers/filter/filterContainer'
import { PaginationContainer } from '../../containers/pagination/paginationContainer'

import './styles.sass'

const MainPage: React.FC = () => {
  return (
    <main className="main-page">
      <FilterContainer />
      <QuestionsListContainer />
      <PaginationContainer />
    </main>
  )
}

export default MainPage