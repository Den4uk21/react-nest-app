import React from 'react'
import { QuestionContainer } from '../../containers/question/questionContainer'

import './styles.sass'

const MainPage: React.FC = () => {
  return (
    <main className="main-page">
      <QuestionContainer />
    </main>
  )
}

export default MainPage