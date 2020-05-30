import React from 'react'

import { QuestionContainer } from '../../containers/question/questionContainer'
import { FilterContainer } from '../../containers/filter/filterContainer'

import './styles.sass'

const MainPage: React.FC = () => {
  return (
    <main className="main-page">
      <FilterContainer />
      <QuestionContainer />
    </main>
  )
}

export default MainPage